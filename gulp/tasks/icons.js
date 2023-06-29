export const icons = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.gulp.dest(`${app.path.build.images}/icons`));
}