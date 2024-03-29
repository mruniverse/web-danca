import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import Konva from "konva";

export const useStageStore = defineStore("stageStore", () => {
  const expanded = ref(false);
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
    transformer: {
      resizeEnabled: true, 
      rotationSnaps: [0, 45, 90, 135, 180, 225, 270]
    },
    elements: [],
    podiums: [],
    texts: [],
  });

  function getElementsByName(name) {
    const stage = refs.stage.getStage();
    return stage.children[0].children
      .filter((child) => {
        return child.attrs.name === name;
      })
      .map((child) => {
        return child.attrs;
      });
  }

  function syncElements() {
    configs.elements = getElementsByName("seat");
    configs.podiums = getElementsByName("podium");
    configs.texts = getElementsByName("text");
  }

  function deleteSeat(seat) {
    configs.elements = configs.elements.filter((element) => {
      return element.id !== seat.attrs.id;
    });
  }

  function deletePodium(podium) {
    configs.podiums = configs.podiums.filter((element) => {
      return element.id !== podium.attrs.id;
    });
  }

  function deleteText(text) {
    configs.texts = configs.texts.filter((element) => {
      return element.id !== text.attrs.id;
    });
  }

  function clearSelection() {
    return refs.transformer.getNode().nodes([]);
  }

  function togglePanel() {
    configs.konva.width = 1;
    configs.konva.height = 1;
    expanded.value = !expanded.value;
  }

  function loadSeatsAssets() {
    configs.elements.find((element) => {
      setElementCursors(element.id);
    });
  }

  function setElementCursors(id) {
    const stage = refs.stage.getStage();
    setTimeout(() => {
      stage.findOne(`#${id}`).on("mouseenter", (e) => {
        stage.container().style.cursor = "grab";
      });
      stage.findOne(`#${id}`).on("mouseleave", (e) => {
        stage.container().style.cursor = "default";
      });
      stage.findOne(`#${id}`).on("mousedown", (e) => {
        stage.container().style.cursor = "grabbing";
      });
      stage.findOne(`#${id}`).on("mouseup", (e) => {
        stage.container().style.cursor = "grab";
      });
    }, 10);
  }

  function generateNewID(elementName, elements) {
    if (elements.length > 0) {
      let lastElement = elements[elements.length - 1];
      let lastElementID = lastElement.id.split("-")[1];

      return `${elementName}-${Number(lastElementID) + 1}`;
    } else {
      return `${elementName}-0`;
    }
  }

  function generateSeats(rows, columns, type = 'default') {
    let seatRadius = 25;
    let spaceBetweenSeats = 8;
    let firstFreeColumn = 50;
    let firstFreeRow = getLastFreeRow() + spaceBetweenSeats;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        let id = generateNewID('seat', configs.elements);

        configs.elements.push({
          id: id,
          fill: getSeatColor(type),
          x: firstFreeColumn + column * ((seatRadius*2) + spaceBetweenSeats),
          y: firstFreeRow + row * ((seatRadius*2) + spaceBetweenSeats),
          stroke: "transparent",
          strokeWidth: spaceBetweenSeats,
          radius: seatRadius,
          name: "seat",
          draggable: true,
        });
      }
    }
    loadSeatsAssets();
  }

  function getSeatColor(type) {
    switch (type) {
      case "default":
        return "#4CAF50";
      case "special":
        return "#FFC107";
      case "wheelchair":
        return "#2196F3";
      default:
        return "#4CAF50";
    }
  }

  function generatePodiums(type) {
    let height = 1;
    let width = 1;
    let firstFreeRow = getLastFreeRow();
    let firstFreeColumn = 50;
    let element = {
      id: 0,
      rotation: 0,
      x: firstFreeColumn,
      y: firstFreeRow + 10,
      fill: "grey",
      stroke: "black",
      strokeWidth: 2,
      strokeScaleEnabled: false,
      name: "podium",
      draggable: true,
    };

    switch (type) {
      case "circle":
        element.id = generateNewID('podium', configs.elements);
        element.radius = width * 25;
        configs.elements.push(element);
        break;
      case "square":
      default:
        element.id = generateNewID('podium', configs.podiums);
        element.width = width * 50,
        element.height = height * 50,
        configs.podiums.push(element);
        break;
    }

    setElementCursors(element.id);
  }

  function generateText(text, fontSize) {
    if (text === "") return;
    let firstFreeRow = getLastFreeRow();
    let firstFreeColumn = 50;
    let id = generateNewID('text', configs.texts);

    configs.texts.push({
      id: id,
      rotation: 0,
      x: firstFreeColumn,
      y: firstFreeRow + 10,
      text: text.toUpperCase(),
      fontSize: fontSize,
      fill: "#000",
      padding: 5,
      align: "center",
      name: "text",
      draggable: true,
    });

    setElementCursors(id);
  }

  function getLastFreeRow() {
    let elementsRows = [];
    let podiumsRows = [];
    let textsRows = [];
    let rows = [];

    if (configs.elements.length > 0) {
      elementsRows = configs.elements.map(
        (element) => element.y + element.radius*2
      );
      rows.push(...elementsRows);
    }
    if (configs.podiums.length > 0) {
      podiumsRows = configs.podiums.map((podium) => podium.y + podium.height);
      rows.push(...podiumsRows);
    }
    if (configs.texts.length > 0) {
      textsRows = configs.texts.map((text) => text.y + text.fontSize + 10);
      rows.push(...textsRows);
    }

    let firstFreeRow = Math.round(Math.max(...rows));
    return firstFreeRow >= 100 ? firstFreeRow : 100;
  }

  return {
    deleteSeat,
    deletePodium,
    deleteText,
    clearSelection,
    expanded,
    seats,
    refs,
    configs,
    togglePanel,
    loadSeatsAssets,
    generateSeats,
    generatePodiums,
    generateText,
    syncElements,
  };
});
