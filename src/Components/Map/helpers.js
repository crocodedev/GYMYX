export const mapStyle = {
  width: "100%",
  height: "100%",
};

export const mapOptions = {
  suppressMapOpenBlock: true,
  behaviors: ["drag", "dblClickZoom"],
};

export const createSvgMarker = () => {
  return {
    svgData: `<svg xmlns="http://www.w3.org/2000/svg" width="95" height="141" viewBox="0 0 95 141" fill="none">
    <path d="M37.5168 125.243L7.19531 70.5938H88.156L54.8115 125.577C50.8301 132.142 41.2419 131.957 37.5168 125.243Z" fill="#212428"/>
    <circle cx="47.6757" cy="47.205" r="46.7773" fill="#212428"/>
    <circle cx="47.6745" cy="47.2052" r="33.2838" fill="white"/>
    <path d="M34.097 37.252L44.7475 26.1935C45.278 25.6222 46.1757 25.6222 46.747 26.1527L55.0714 34.1507C55.6427 34.6812 56.5405 34.6812 57.0709 34.1099L63.4367 27.5809C63.7224 27.2952 64.212 27.2544 64.5385 27.5809L67.9662 30.927C68.2519 31.2126 68.2927 31.7023 67.9662 32.0288L57.3158 42.924C56.7853 43.4953 55.8876 43.4953 55.3163 42.9648L46.8694 34.926C46.2981 34.3955 45.4004 34.3955 44.8699 34.9668L38.5449 41.5366C38.2593 41.8631 37.7696 41.8631 37.4432 41.5774L34.097 38.3537C33.8114 38.0681 33.8114 37.5784 34.097 37.252Z" fill="#294AE7"/>
    <path d="M42.8296 44.8433L45.9717 41.7012C46.3389 41.334 46.9102 41.334 47.2774 41.7012L58.5808 53.0862C59.1929 53.6983 59.1929 54.6776 58.5808 55.2897L47.5631 66.7154C47.1958 67.0827 46.6245 67.0827 46.2573 66.7562L43.0744 63.7366C42.7072 63.3693 42.7072 62.798 43.0336 62.4308L49.8482 55.4121C50.4603 54.8 50.4195 53.8207 49.8482 53.2086L42.748 46.1899C42.4623 45.7818 42.4623 45.2106 42.8296 44.8433Z" fill="#294AE7"/>
    <path d="M38.3413 50.3913C34.6687 54.1863 30.9962 57.9405 27.3236 61.7354C27.038 62.0619 27.038 62.5516 27.3236 62.8372L30.6289 66.1425C30.9554 66.469 31.445 66.469 31.7715 66.1425L42.2995 55.2064C42.83 54.6352 42.83 53.7374 42.2995 53.1661L39.4839 50.3505C39.1574 50.0649 38.6269 50.0649 38.3413 50.3913Z" fill="#294AE7"/>
    </svg>`,
    iconLayout: "default#image",
    iconImageHref:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="95" height="141" viewBox="0 0 95 141" fill="none">
      <path d="M37.5168 125.243L7.19531 70.5938H88.156L54.8115 125.577C50.8301 132.142 41.2419 131.957 37.5168 125.243Z" fill="#212428"/>
      <circle cx="47.6757" cy="47.205" r="46.7773" fill="#212428"/>
      <circle cx="47.6745" cy="47.2052" r="33.2838" fill="white"/>
      <path d="M34.097 37.252L44.7475 26.1935C45.278 25.6222 46.1757 25.6222 46.747 26.1527L55.0714 34.1507C55.6427 34.6812 56.5405 34.6812 57.0709 34.1099L63.4367 27.5809C63.7224 27.2952 64.212 27.2544 64.5385 27.5809L67.9662 30.927C68.2519 31.2126 68.2927 31.7023 67.9662 32.0288L57.3158 42.924C56.7853 43.4953 55.8876 43.4953 55.3163 42.9648L46.8694 34.926C46.2981 34.3955 45.4004 34.3955 44.8699 34.9668L38.5449 41.5366C38.2593 41.8631 37.7696 41.8631 37.4432 41.5774L34.097 38.3537C33.8114 38.0681 33.8114 37.5784 34.097 37.252Z" fill="#294AE7"/>
      <path d="M42.8296 44.8433L45.9717 41.7012C46.3389 41.334 46.9102 41.334 47.2774 41.7012L58.5808 53.0862C59.1929 53.6983 59.1929 54.6776 58.5808 55.2897L47.5631 66.7154C47.1958 67.0827 46.6245 67.0827 46.2573 66.7562L43.0744 63.7366C42.7072 63.3693 42.7072 62.798 43.0336 62.4308L49.8482 55.4121C50.4603 54.8 50.4195 53.8207 49.8482 53.2086L42.748 46.1899C42.4623 45.7818 42.4623 45.2106 42.8296 44.8433Z" fill="#294AE7"/>
      <path d="M38.3413 50.3913C34.6687 54.1863 30.9962 57.9405 27.3236 61.7354C27.038 62.0619 27.038 62.5516 27.3236 62.8372L30.6289 66.1425C30.9554 66.469 31.445 66.469 31.7715 66.1425L42.2995 55.2064C42.83 54.6352 42.83 53.7374 42.2995 53.1661L39.4839 50.3505C39.1574 50.0649 38.6269 50.0649 38.3413 50.3913Z" fill="#294AE7"/>
      </svg>`
      ),

    iconImageSize: window?.innerWidth > 1280 ? [94, 140] : [35, 53],
    iconImageOffset: window?.innerWidth > 1280 ? [-47, -70] : [-17, -27],
  };
};

export const getCoords = (coords = "") => {
  return coords.replace(/[ ]/, "").split(",").map(parseFloat);
};
