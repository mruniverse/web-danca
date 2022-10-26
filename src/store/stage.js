import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import Konva from "konva";

export const useStageStore = defineStore("stageStore", () => {
  const expanded = ref(false);
  const selectedShapeID = ref('');
  const seats = reactive({
    rows: 1,
    columns: 1,
  });
  const refs = {
    stage: ref(null),
    transformer: ref(null),
    layer: ref(null),
  };
  const configs = reactive({
    konva: {
      width: 1,
      height: 1,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      draggable: false,
    },
    elements: [],
    podiums: [],
  });

  function togglePanel() {
    configs.konva.width = 1;
    configs.konva.height = 1;
    expanded.value = !expanded.value;
  }

  function loadSeatsAssets() {
    const stage = refs.stage.getStage();
    const aux = new window.Image();
    aux.src = "/svg/seat.svg";
    aux.onload = () => {
      configs.elements.find((element) => {
        // set seat svg as image
        element.name === "seat" ? (element.image = aux) : null;

        // set seat cursor
        stage.findOne("#" + element.id).on("mouseenter", (e) => {
          stage.container().style.cursor = "grab";
        });
        stage.findOne("#" + element.id).on("mouseleave", (e) => {
          stage.container().style.cursor = "default";
        });
        stage.findOne("#" + element.id).on("mousedown", (e) => {
          stage.container().style.cursor = "grabbing";
        });
        stage.findOne("#" + element.id).on("mouseup", (e) => {
          stage.container().style.cursor = "grab";
        });
      });
    };
  }

  function setPodiumCursors(id) {
    const stage = refs.stage.getStage();
    console.log(stage);
    stage.findOne("#" + id).on("mouseenter", (e) => {
      stage.container().style.cursor = "grab";
    });
    stage.findOne("#" + id).on("mouseleave", (e) => {
      stage.container().style.cursor = "default";
    });
    stage.findOne("#" + id).on("mousedown", (e) => {
      stage.container().style.cursor = "grabbing";
    });
    stage.findOne("#" + id).on("mouseup", (e) => {
      stage.container().style.cursor = "grab";
    });
  }

  function generateSeats(rows, columns) {
    let firstFreeRow = getLastFreeRow();
    let firstFreeColumn = 50;
    
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        configs.elements.push({
          id: `seat${column}${row + ((firstFreeRow-100)/50)}`,
          image: null,
          rotation: 270,
          x: firstFreeColumn + column * 50,
          y: firstFreeRow + row * 50,
          width: 50,
          height: 50,
          name: "seat",
          draggable: true,
        });
      }
    }
    loadSeatsAssets();
  }

  function generatePodiums(rows, columns) {
    let firstFreeRow = getLastFreeRow();
    let firstFreeColumn = 50;
    let id = `podium${columns}${rows + (firstFreeRow - 100) / 50}`;
    configs.podiums.push({
      id: id,
      x: firstFreeColumn,
      y: firstFreeRow + 10,
      width: columns * 50,
      height: rows * 50,
      fill: "grey",
      stroke: "black",
      strokeWidth: 2,
      name: "podium",
      draggable: true,
    });

    setPodiumCursors(id);
  }

  function getLastFreeRow() {
    let elementsRows = [];
    let podiumsRows = [];
    let rows = [];

    if (configs.elements.length > 0) {
      elementsRows = configs.elements.map((element) => element.y + element.height);
      rows.push(...elementsRows);
    }
    if (configs.podiums.length > 0) {
      podiumsRows = configs.podiums.map((podium) => podium.y + podium.height);
      rows.push(...podiumsRows);
    }

    let firstFreeRow = Math.round(Math.max(...rows));
    return firstFreeRow >= 100 ? firstFreeRow : 100;
  }

  return {
    expanded,
    seats,
    refs,
    configs,
    togglePanel,
    loadSeatsAssets,
    generateSeats,
    generatePodiums
  };
});
