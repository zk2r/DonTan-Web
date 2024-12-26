var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as defs from "../lib/defs.js";
const programArea = document.querySelector("#program");
const inputArea = document.querySelector("#input");
const outputArea = document.querySelector("#output");
const runButton = document.querySelector("#run");
const stopButton = document.querySelector("#stop");
const cellSize = document.querySelector("#cell-size");
const cellArraySize = document.querySelector("#array-size");
const noChangeEof = document.querySelector("#no-change");
const zeroEof = document.querySelector("#zero");
const negOneEof = document.querySelector("#neg-one");
const statusDiv = document.querySelector(".controls-status");
let moduleCache;
let cached = false;
let currentWorker;

function brainfuckToHiragana(program) {
    return program.replace(/>/g, 'どん').replace(/</g, 'たん').replace(/\+/g, 'どど').replace(/\-/g, 'うー').replace(/\./g, 'あべばべばばば').replace(/,/g, '！').replace(/\[/g, 'はい').replace(/\]/g, 'わお');
    // return program.replace(/>/g, 'も').replace(/</g, 'い').replace(/\+/g, 'う').replace(/\-/g, 'え').replace(/\./g, 'お').replace(/,/g, 'か').replace(/\[/g, 'き').replace(/\]/g, 'く');
}

programArea.addEventListener("input", _ => {
    cached = false;
    statusDiv.textContent = "準備完了";
    programArea.value = brainfuckToHiragana(programArea.value);
});

programArea.addEventListener("input", _ => {
    cached = false;
    statusDiv.textContent = "準備完了";
});
cellSize.addEventListener("input", _ => {
    cached = false;
    statusDiv.textContent = "準備完了";
});
cellArraySize.addEventListener("input", _ => {
    cached = false;
    statusDiv.textContent = "準備完了";
});
inputArea.addEventListener("input", _ => {
    statusDiv.textContent = "準備完了";
});
noChangeEof.addEventListener("input", _ => {
    cached = false;
    statusDiv.textContent = "準備完了";
});
zeroEof.addEventListener("input", _ => {
    cached = false;
    statusDiv.textContent = "準備完了";
});
negOneEof.addEventListener("input", _ => {
    cached = false;
    statusDiv.textContent = "準備完了";
});
function disableEverything() {
    programArea.disabled = true;
    inputArea.disabled = true;
    runButton.disabled = true;
    stopButton.disabled = false;
    cellSize.disabled = true;
    cellArraySize.disabled = true;
    noChangeEof.disabled = true;
    zeroEof.disabled = true;
    negOneEof.disabled = true;
}
function enableEverything() {
    programArea.disabled = false;
    inputArea.disabled = false;
    runButton.disabled = false;
    stopButton.disabled = true;
    cellSize.disabled = false;
    cellArraySize.disabled = false;
    noChangeEof.disabled = false;
    zeroEof.disabled = false;
    negOneEof.disabled = false;
}
function withEverythingDisabled(run) {
    return __awaiter(this, void 0, void 0, function* () {
        disableEverything();
        try {
            const ret = yield run();
            return ret;
        }
        finally {
            enableEverything();
        }
    });
}
runButton.addEventListener("click", _ => withEverythingDisabled(() => __awaiter(void 0, void 0, void 0, function* () {
    currentWorker = new defs.WorkerWrapper(cached ? moduleCache : programArea.value, inputArea.value, {
        cellSize: Number.parseInt(cellSize.value),
        numCells: Number.parseInt(cellArraySize.value),
        eof: noChangeEof.checked ? "no-change" : negOneEof.checked ? "-1" : zeroEof.checked ? "0" : "no-change",
    }, {
        updateUi: (status, output) => {
            statusDiv.textContent = (s => {
                switch (s) {
                    case 0:
                        return "コンパイル中...";
                    case 1:
                        return "キャッシュ中...";
                    case 2:
                        return "実行中...";
                    case 3:
                        return "コンパイルエラー";
                    case 4:
                        return "ランタイムエラー";
                    case 5:
                        return "正常終了";
                    case 6:
                        return "中断";
                }
            })(status);
            outputArea.value = output;
        }, cacheModule: (mod) => {
            moduleCache = mod;
            cached = true;
        },
    });
    yield currentWorker.ended;
})));
stopButton.addEventListener("click", _ => { var _a; return (_a = currentWorker) === null || _a === void 0 ? void 0 : _a.terminate(); });
//# sourceMappingURL=main.js.map