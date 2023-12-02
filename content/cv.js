function buildCV() {
    let cv = new CV_t(document);

    app.content.Clear();
    app.content.Mount(cv);
}


includeScript('scripts/cv.js', buildCV);


