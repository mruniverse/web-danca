<template>
    <v-row>
        <v-col align="left" class="pr-0">
            <v-card id="stage-parent" width="100%" height="80vh" flat v-resize="fitStageIntoParentContainer">
                <v-stage
                    :ref="refs.stage" 
                    @wheel="onStageZoom" 
                    @contextmenu="moveStage" 
                    @mousedown="handleSelectionDown"
                    @touchstart="handleSelectionDown" 
                    @mouseup="handleStageMouseUp"
                    @touchend="handleStageMouseUp"
                    @mousemove="handleSelectionMove"
                    @touchmove="handleSelectionMove"
                    @click="handleSelectionClick"
                    :config="stageStore.configs.konva">
                        <v-layer :ref="refs.layer">
                            <!-- <v-circle @transitionend="updateTransformer" :config="stageStore.configs.elements[0]"></v-circle> -->
                            <v-image 
                                v-for="element in stageStore.configs.elements" 
                                :key="element.id" 
                                :config="element">
                            </v-image>
                            <v-rect
                                :ref="refs.selectionRectangle"
                                :config="selectionRectangle"
                                name="selectionRectangle">
                            </v-rect>
                            <v-rect 
                                v-for="podium in stageStore.configs.podiums"
                                :key="podium.id"
                                :config="podium"
                                name="podium">
                            </v-rect>
                            <v-transformer :config="{ resizeEnabled: false }" :ref="refs.transformer" />
                        </v-layer>
                </v-stage>
            </v-card>
        </v-col>
        <v-col cols="auto" align="right" class="px-0">
            <controllPannel></controllPannel>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Konva from 'konva';
import controllPannel from '@/components/account/Home/StageComponents/controllPanel.vue';
import { useStageStore } from '@/store/stage';

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
const props = defineProps({
    rows: Number,
    columns: Number
});

onMounted(() => {
    stageStore.refs.stage = refs.stage;
    stageStore.refs.transformer = refs.transformer;
    stageStore.refs.layer = refs.layer;
    stageStore.refs.selectionRectangle = refs.selectionRectangle;
});

function handleSelectionClick(e) {
    let stage = stageStore.refs.stage.getStage();
    let selectionRectangle = stage.findOne('.selectionRectangle');

    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
        return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
        stageStore.refs.transformer.getNode().nodes([]);
        return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('seat')) {
        return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = stageStore.refs.transformer.getNode().nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected select just one
        stageStore.refs.transformer.getNode().nodes([e.target]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = stageStore.refs.transformer.getNode().nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        stageStore.refs.transformer.getNode().nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = stageStore.refs.transformer.getNode().nodes().concat([e.target]);
        stageStore.refs.transformer.getNode().nodes(nodes);
    }
}

function handleSelectionUp(e) {
    let stage = stageStore.refs.stage.getStage();
    let selectionRectangle = stage.findOne('.selectionRectangle');

    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
        selectionRectangle.visible(false);
    });

    var shapes = stage.find('.seat');
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    stageStore.refs.transformer.getNode().nodes(selected);
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
    if(e.evt.button === 2) return moveStage(e);
    
    let stage = stageStore.refs.stage.getStage();
    let selectionRectangle = stage.findOne('.selectionRectangle');    

    // do nothing if we mousedown on any shape
    if (e.target !== stage) {
        return;
    }

    x1 = getRelativePointerPosition(stage).x;
    y1 = getRelativePointerPosition(stage).y;
    x2 = x1;
    y2 = y1;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
}

function getRelativePointerPosition(konvaElement){
    let scale = stageStore.configs.konva.scaleX;
    let pointer = konvaElement.getPointerPosition();
    return {
        x: (pointer.x - konvaElement.x()) / scale,
        y: (pointer.y - konvaElement.y()) / scale,
    };
}

// drag stage with right mouse button
function moveStage(e){
    e.evt.preventDefault();
    
    const stage = stageStore.refs.stage.getStage();
    if(e.evt.type === 'mousedown'){
        stage.container().style.cursor = 'move';
        stage.startDrag();
    }else{
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
    handleSelectionUp(e);
    const stage = refs.stage.value.getStage();
    const stageSeats = stage.children[0].children.filter((child) => {
        return child.attrs.name === 'seat';
    }).map((child) => {
        return child.attrs
    });

    stageStore.configs.elements = stageSeats;
}
</script>

<style lang="scss">
#stage-parent, canvas {
    border-radius: 13px 0 0 13px;
}
</style>