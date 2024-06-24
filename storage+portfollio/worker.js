function calculate() {
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += i;
    }
    return result;
}
self.addEventListener("message", function(event) {
    const result = calculate();
    self.postMessage(result);
    self.close();
});
