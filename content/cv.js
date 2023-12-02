function buildCV() {
    let cv = new CV_t(document);

    app.content.Clear();
    app.content.Mount(cv.elem);
}


includeScript('scripts/cv.js', buildCV);


