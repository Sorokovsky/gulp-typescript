import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./docs`;
const srcFolder = `./src`;
export const path = {
    build: {
        js: `${buildFolder}/js/`,
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        images: `${buildFolder}/img/`,
        files: `${buildFolder}/`,
        fonts: `${buildFolder}/fonts/`
    },
    src: {
        js: `${srcFolder}/js/script.js`,
        files: `${srcFolder}/*.{js,json}`,
        svg: `${srcFolder}/img/**/*.svg`,
        html: `${srcFolder}/*.{html,pug}`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,svg,ico,png,gif,webp}`,
        sass: `${srcFolder}/sass/style.sass`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        sass: `${srcFolder}/sass/**/*.sass`,
        html: `${srcFolder}/**/*.{html,pug}`,
        files: `${srcFolder}/*.{js,json}`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,svg,ico,png,gif,webp}`,
    },
    clean: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
}