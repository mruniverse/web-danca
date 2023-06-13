<template>
    <v-row no-gutters :style="{ height: `${height}px` }">
        <v-col align="left" class="pr-0">
            <v-card id="stage-parent" flat v-resize="fitStageIntoParentContainer">
                <v-stage :ref="refs.stage" @wheel="onStageZoom" @contextmenu="moveStage"
                    @mousedown="handleSelectionDown" @touchstart="handleSelectionDown" @mouseup="handleStageMouseUp"
                    @touchend="handleStageMouseUp" @mousemove="handleSelectionMove" @touchmove="handleSelectionMove"
                    :config="stageStore.configs.konva">
                    <v-layer :ref="refs.layer">
                        <v-rect v-for="podium in stageStore.configs.podiums" :key="podium.id" :config="podium">
                        </v-rect>
                        <v-circle v-for="element in stageStore.configs.elements" :key="element.id" :config="element">
                        </v-circle>
                        <v-text v-for="elementText in stageStore.configs.elementsTexts" :key="elementText.id"
                            :config="elementText">
                        </v-text>
                        <v-text v-for="text in stageStore.configs.texts" :key="text.id" :config="text">
                        </v-text>
                        <v-rect :ref="refs.selectionRectangle" :config="selectionRectangle" name="selectionRectangle">
                        </v-rect>
                        <v-transformer :config="stageStore.configs.transformer" :ref="refs.transformer" />
                    </v-layer>
                </v-stage>
            </v-card>
        </v-col>
        <v-col cols="auto" align="right" class="px-0 fill-height">
            <control-panel v-show="!hideControlPannel"></control-panel>
        </v-col>
    </v-row>
</template>

<script>
import { ref, onMounted } from 'vue';
import Konva from 'konva';
import { useStageStore } from '@/store/stage';

export default {
    name: 'Stage',
    props: {
        hideControlPannel: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const GUIDELINE_OFFSET = ref(5);
        const stageStore = useStageStore();
        var x1 = ref(0);
        var y1 = ref(0);
        var x2 = ref(0);
        var y2 = ref(0);
        const selectionRectangle = ref({
            fill: 'rgba(0,0,255,0.5)',
            visible: false,
        });
        const refs = {
            stage: ref(null),
            transformer: ref(null),
            layer: ref(null),
            selectionRectangle: ref(null),
        };

        onMounted(() => {
            stageStore.refs.stage = refs.stage;
            stageStore.refs.transformer = refs.transformer;
            stageStore.refs.layer = refs.layer;
            stageStore.refs.selectionRectangle = refs.selectionRectangle;
            listenToDeleteElements();
        });

        const height = ref(0);
        function resizeHeight() {
            height.value = window.innerHeight - 232;
        }

        function listenToDeleteElements() {
            window.addEventListener('keydown', async (e) => {
                if (e.key === 'Delete') {
                    stageStore.hideSeatsTexts();
                    deleteSelectedElements();
                }
            });
        }

        function deleteSelectedElements() {
            const selectedElements = stageStore.refs.transformer.getNode().nodes();
            selectedElements.forEach((selected) => {
                stageStore.deleteSeat(selected);
                stageStore.deletePodium(selected);
                stageStore.deleteText(selected);
            });
            stageStore.clearSelection();
        }

        function setTransformerNodes(nodes, rotate = true, resize = false) {
            // set all anchors to be visible
            let enabledAnchors = [
                'top-left',
                'top-center',
                'top-right',
                'middle-left',
                'middle-right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ];

            if (nodes.length === 1) {
                switch (nodes[0].name()) {
                    case 'seat':
                        rotate = false;
                        break;
                    case 'podium':
                        resize = true;
                        break;
                    case 'text':
                        enabledAnchors = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
                        resize = true;
                        break;
                }
            }

            stageStore.refs.transformer.getNode().nodes(nodes)
                .rotateEnabled(rotate)
                .resizeEnabled(resize)
                .enabledAnchors(enabledAnchors);
        }

        function handleSelectionClick(e) {
            stageStore.generateSeatsTexts();

            // do we pressed shift or ctrl?
            const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
            const isSelected = stageStore.refs.transformer.getNode().nodes().indexOf(e.target) >= 0;

            // if no metaKey is pressed and the no node is selected, select just one
            if (!metaPressed && !isSelected) {
                setTransformerNodes([e.target]);
            } else if (metaPressed && isSelected) {
                // if we pressed keys and node was selected we need to remove it from selection:
                //Obs: use slice to have new copy of array
                const nodes = stageStore.refs.transformer.getNode().nodes().slice();
                // remove node from array
                nodes.splice(nodes.indexOf(e.target), 1);
                setTransformerNodes(nodes);
            } else if (metaPressed && !isSelected) {
                // add the node into selection
                const nodes = stageStore.refs.transformer.getNode().nodes().concat([e.target]);
                setTransformerNodes(nodes);
            }
        }

        function handleSelectionUp(e) {
            e.evt.preventDefault();

            let stage = stageStore.refs.stage.getStage();
            let selectionRectangle = stage.findOne('.selectionRectangle');
            let isAnchor = e.target.name().includes('anchor');

            if (isAnchor) return stageStore.generateSeatsTexts();

            // update visibility in timeout, so we can check it in click event
            setTimeout(() => {
                selectionRectangle.visible(false);
            });

            // if selection is not visible, handle element clicks
            if (!selectionRectangle.visible()) {
                if (e.target === stage) {
                    return stageStore.clearSelection();
                } else {
                    return handleSelectionClick(e);
                }
            }

            let elements = getElementsFromStage();
            let box = selectionRectangle.getClientRect();
            let selected = elements.filter((shape) =>
                Konva.Util.haveIntersection(box, shape.getClientRect())
            );

            setTransformerNodes(selected);
        }

        function getElementsFromStage() {
            let stage = stageStore.refs.stage.getStage();

            let seats = stage.find('.seat');
            let podiums = stage.find('.podium');
            let texts = stage.find('.text');
            return [...seats, ...podiums, ...texts];
        }

        function handleSelectionMove(e) {
            let stage = stageStore.refs.stage.getStage();
            let selectionRectangle = stage.findOne('.selectionRectangle');

            // do nothing if we didn't start selection
            if (!selectionRectangle.visible()) {
                return;
            }

            x2 = getRelativePointerPosition(stage).x;
            y2 = getRelativePointerPosition(stage).y;

            selectionRectangle.setAttrs({
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1),
            });
        }

        function handleSelectionDown(e) {
            // if clicked with right button, move stage
            if (e.evt.button === 2) return moveStage(e);

            let stage = stageStore.refs.stage.getStage();
            let selectionRectangle = stage.findOne('.selectionRectangle');

            // do nothing if we mousedown on any shape
            if (e.target !== stage) {
                stageStore.hideSeatsTexts();
                return listenToDragMove(e);
            }

            x1 = getRelativePointerPosition(stage).x;
            y1 = getRelativePointerPosition(stage).y;
            x2 = x1;
            y2 = y1;

            selectionRectangle.visible(true);
            selectionRectangle.width(0);
            selectionRectangle.height(0);
        }

        function listenToDragMove(e) {
            e.target.on('dragmove', () => {
                return onDragMove(e);
            });
        }

        function getRelativePointerPosition(konvaElement) {
            let scale = stageStore.configs.konva.scaleX;
            let pointer = konvaElement.getPointerPosition();
            return {
                x: (pointer.x - konvaElement.x()) / scale,
                y: (pointer.y - konvaElement.y()) / scale,
            };
        }

        // drag stage with right mouse button
        function moveStage(e) {
            e.evt.preventDefault();

            const stage = stageStore.refs.stage.getStage();
            if (e.evt.type === 'mousedown') {
                stage.container().style.cursor = 'move';
                stage.startDrag();
            } else {
                stage.container().style.cursor = 'default';
                stage.stopDrag();
            }
        }

        function onStageZoom(e) {
            var scaleBy = 1.1;
            let stage = e.target.getStage();

            // stop default scrolling
            e.evt.preventDefault();


            var oldScale = stageStore.configs.konva.scaleX;
            var pointer = stage.getPointerPosition();

            var mousePointTo = {
                x: (pointer.x - stage.x()) / oldScale,
                y: (pointer.y - stage.y()) / oldScale,
            };

            // how to scale? Zoom in? Or zoom out?
            let direction = e.evt.deltaY > 0 ? -1 : 1;

            // when we zoom on trackpad, e.evt.ctrlKey is true
            // in that case lets revert direction
            if (e.evt.ctrlKey) {
                direction = -direction;
            }

            var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

            var newPos = {
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            };

            if (newScale > 0.5 && newScale < 3) {
                stageStore.configs.konva.scaleX = newScale;
                stageStore.configs.konva.scaleY = newScale;
                stageStore.configs.konva.x = newPos.x;
                stageStore.configs.konva.y = newPos.y;
            }
        }

        function fitStageIntoParentContainer() {
            resizeHeight();

            stageStore.configs.konva.width = 1;
            stageStore.configs.konva.height = 1;

            setTimeout(() => {
                // now we need to fit stage into parent container
                var container = document.querySelector('#stage-parent');
                var containerWidth = container.offsetWidth;
                var containerHeight = container.offsetHeight;

                // but we also make the full scene visible
                // so we need to scale all objects on canvas
                var scale = containerWidth / stageStore.configs.konva.width;

                stageStore.configs.konva.width = stageStore.configs.konva.width * scale;
                stageStore.configs.konva.height = containerHeight;
            }, 1);
        }

        function handleStageMouseUp(e) {
            // if clicked with right button, move stage
            if (e.evt.button === 2) return moveStage(e);

            handleSelectionUp(e);
            onDragMoveEnd(e);
            stageStore.syncElements();
        }

        // were can we snap our objects?
        function getLineGuideStops(skipShape) {
            let stage = stageStore.refs.stage.getStage();

            // we can snap to stage borders and the center of the stage
            var vertical = [0, stage.width() / 2, stage.width()];
            var horizontal = [0, stage.height() / 2, stage.height()];
            var selectedElements = stageStore.refs.transformer.getNode().nodes();

            // and we snap over edges and center of each object on the canvas
            stage.find('.seat').forEach((guideItem) => {
                if (guideItem === skipShape || selectedElements.includes(guideItem)) {
                    return;
                }
                var box = guideItem.getClientRect();
                // and we can snap to all edges of shapes
                vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
                horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
            });

            return {
                vertical: vertical.flat(),
                horizontal: horizontal.flat(),
            };
        }

        // what points of the object will trigger to snapping?
        // it can be just center of the object
        // but we will enable all edges and center
        function getObjectSnappingEdges(node) {
            var box = node.getClientRect();
            var absPos = node.absolutePosition();

            return {
                vertical: [
                    {
                        guide: Math.round(box.x),
                        offset: Math.round(absPos.x - box.x),
                        snap: 'start',
                    },
                    {
                        guide: Math.round(box.x + box.width / 2),
                        offset: Math.round(absPos.x - box.x - box.width / 2),
                        snap: 'center',
                    },
                    {
                        guide: Math.round(box.x + box.width),
                        offset: Math.round(absPos.x - box.x - box.width),
                        snap: 'end',
                    },
                ],
                horizontal: [
                    {
                        guide: Math.round(box.y),
                        offset: Math.round(absPos.y - box.y),
                        snap: 'start',
                    },
                    {
                        guide: Math.round(box.y + box.height / 2),
                        offset: Math.round(absPos.y - box.y - box.height / 2),
                        snap: 'center',
                    },
                    {
                        guide: Math.round(box.y + box.height),
                        offset: Math.round(absPos.y - box.y - box.height),
                        snap: 'end',
                    },
                ],
            };
        }

        // find all snapping possibilities
        function getGuides(lineGuideStops, itemBounds) {
            var resultV = [];
            var resultH = [];
            var guides = [];

            lineGuideStops.vertical.forEach((lineGuide) => {
                itemBounds.vertical.forEach((itemBound) => {
                    var diff = Math.abs(lineGuide - itemBound.guide);

                    // if the distance between guild line and object snap point is close we can consider this for snapping
                    if (diff < GUIDELINE_OFFSET.value) {
                        resultV.push({
                            lineGuide: lineGuide,
                            diff: diff,
                            snap: itemBound.snap,
                            offset: itemBound.offset,
                        });
                    }
                });
            });

            lineGuideStops.horizontal.forEach((lineGuide) => {
                itemBounds.horizontal.forEach((itemBound) => {
                    var diff = Math.abs(lineGuide - itemBound.guide);
                    if (diff < GUIDELINE_OFFSET.value) {
                        resultH.push({
                            lineGuide: lineGuide,
                            diff: diff,
                            snap: itemBound.snap,
                            offset: itemBound.offset,
                        });
                    }
                });
            });

            // find closest snap
            var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
            var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
            if (minV) {
                guides.push({
                    lineGuide: minV.lineGuide,
                    offset: minV.offset,
                    orientation: 'V',
                    snap: minV.snap,
                });
            }
            if (minH) {
                guides.push({
                    lineGuide: minH.lineGuide,
                    offset: minH.offset,
                    orientation: 'H',
                    snap: minH.snap,
                });
            }

            return guides;
        }

        function drawGuides(guides) {
            let layer = refs.layer.value.getNode();

            guides.forEach((lg) => {
                if (lg.orientation === 'H') {
                    var line = new Konva.Line({
                        points: [-6000, 0, 6000, 0],
                        stroke: 'rgb(0, 161, 255)',
                        strokeWidth: 1,
                        name: 'guid-line',
                        dash: [4, 6],
                    });
                    layer.add(line);
                    line.absolutePosition({
                        x: 0,
                        y: lg.lineGuide,
                    });
                } else if (lg.orientation === 'V') {
                    var line = new Konva.Line({
                        points: [0, -6000, 0, 6000],
                        stroke: 'rgb(0, 161, 255)',
                        strokeWidth: 1,
                        name: 'guid-line',
                        dash: [4, 6],
                    });
                    layer.add(line);
                    line.absolutePosition({
                        x: lg.lineGuide,
                        y: 0,
                    });
                }
            });
        }

        function onDragMove(e) {
            let layer = refs.layer.value.getNode();
            // clear all previous lines on the screen
            layer.find('.guid-line').forEach((l) => l.destroy());
            // find possible snapping lines
            var lineGuideStops = getLineGuideStops(e.target);
            // find snapping points of current object
            var itemBounds = getObjectSnappingEdges(e.target);
            // now find where can we snap current object
            var guides = getGuides(lineGuideStops, itemBounds);
            var selectedElements = stageStore.refs.transformer.getNode().nodes();

            // do nothing of no snapping
            if (!guides.length) {
                return;
            }

            drawGuides(guides);

            if (selectedElements.length > 1) {
                return;
            }

            var absPos = e.target.absolutePosition();
            // now force object position
            guides.forEach((lg) => {
                switch (lg.snap) {
                    case 'start': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'center': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                    case 'end': {
                        switch (lg.orientation) {
                            case 'V': {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                            case 'H': {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                        }
                        break;
                    }
                }
            });
            e.target.absolutePosition(absPos);
        };

        function onDragMoveEnd(e) {
            let layer = refs.layer.value.getNode();

            // clear all previous lines on the screen
            layer.find('.guid-line').forEach((l) => l.destroy());
        };

        return { 
            onDragMove, 
            onDragMoveEnd, 
            refs, 
            height, 
            stageStore, 
            fitStageIntoParentContainer, 
            onStageZoom, 
            moveStage, 
            handleSelectionDown, 
            handleSelectionClick, 
            handleSelectionMove,
            handleSelectionUp,
            handleStageMouseUp,
            selectionRectangle
        };
    }
}
</script>

<style lang="scss">
#stage-parent,
canvas {
    border-radius: 13px 0 0 13px;
    background-color: var(--v-background-base);
    width: 100%;
    height: 100%;
}

.custom-height {
    height: 60vh;
}
</style>