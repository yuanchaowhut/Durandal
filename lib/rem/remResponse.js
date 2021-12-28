window.webSetting = {
    // 设计稿屏幕宽度
    designWidth: 1920,
    limitWidth: 1366
};

function initFontSize() {
    var baseWidth = document.documentElement.clientWidth >= window.webSetting.limitWidth ? document.documentElement.clientWidth : window.webSetting.limitWidth;
    var rath = window._screenRath = baseWidth / window.webSetting.designWidth;
    document.documentElement.style.fontSize = (rath * 100) + "px";

    window._eChartsFont = {
        legendSize: 16 * rath,
        xAxisSize: 16 * rath,
        yAxisSize: 14 * rath,
        barOffsetY: -26 * rath,
        barLabelSize: 20 * rath,
        barWidth: 12 * rath,
        gauge: {
            axisLineWidth: 45 * rath,
            axisLabelSize: 12 * rath,
            richWidth: 100 * rath,
            richSizeA: 22 * rath,
            richHeight: 20 * rath
        },
        legendBigSize: 18 * rath,
        xAxisBigSize: 18 * rath,
        yAxisBigSize: 18 * rath
    };
}

initFontSize();
window.addEventListener("resize", initFontSize);