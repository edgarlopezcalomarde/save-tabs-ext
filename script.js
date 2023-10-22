const btnDownloadTabs = document.querySelector(".save");
const btnCopyTabs = document.querySelector(".copy");
const btnDownloadTabsAsJSON = document.querySelector(".saveAsJson");
const btnUpload = document.querySelector(".upload");
const inputFile = document.querySelector("#urlFile");
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

const downloadAsJson = (jsonStr) => {
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  enlaceOculto.href = url;
  enlaceOculto.download = "urls.json";
  enlaceOculto.click();
  URL.revokeObjectURL(url);
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

btnDownloadTabsAsJSON.addEventListener("click", () => {
  chrome.tabs.query({}, (tabs) => {
    downloadAsJson(JSON.stringify(tabs));
  });
});

btnUpload.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", () => {
  const selectedFile = inputFile.files[0];

  if (selectedFile) {
    const reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.addEventListener("load", () => {
      const urls = JSON.parse(reader.result);

      urls.forEach(({ url }) => {
        chrome.tabs.create({ url });
      });
    });
  }
});
