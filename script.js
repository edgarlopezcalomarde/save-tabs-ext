const btnDownloadTabs = document.querySelector(".save");
const btnCopyTabs = document.querySelector(".copy");
const enlaceOculto = document.querySelector("#hideDownload");

const formatStringObj = (tabs) => {
  let res = "";
  tabs.forEach((tab) => {
    res += `${tab.url}\n`;
  });

  return res;
};

const copyToClipBoard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Successfully");
    })
    .catch((err) => {
      console.log("Bad");
      console.log(err);
    });
};

const downloadAsTxt = (text) => {
  const blob = new Blob([text], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  enlaceOculto.href = url;
  enlaceOculto.download = "urls.txt";
  enlaceOculto.click();
};

btnCopyTabs.addEventListener("click", () => {
  chrome.tabs.query({}, (tabs) => {
    const formatedTabs = formatStringObj(tabs);
    copyToClipBoard(formatedTabs);
  });
});

btnDownloadTabs.addEventListener("click", () => {
  chrome.tabs.query({}, (tabs) => {
    const formatedTabs = formatStringObj(tabs);
    downloadAsTxt(formatedTabs);
  });
});
