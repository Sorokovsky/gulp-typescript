import svgSprite from 'gulp-svg-sprite';
export const svgSprive = () => {
    return app.gulp.src(`${app.gulp.src.svgicons}`, {})
        .pipe(svgSprite({
            mode: {
                stack: {
                    example: true,
                },
                allowEmpty: true
            }
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}