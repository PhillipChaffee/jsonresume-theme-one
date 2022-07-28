import fs from "fs";
import Handlebars from "handlebars";

const COURSES_COLUMNS = 3;

const PREPEND_SUMMARY_CATEGORIES = [
    "work",
    "volunteer",
    "awards",
    "publications",
    "projects"
];

function validateArray(arr) {
    return arr !== undefined && arr !== null && arr instanceof Array && arr.length > 0;
}

function render(resume) {
    // Split courses into 3 columns
    if (validateArray(resume.education)) {
        resume.education.forEach((block) => {
            if (validateArray(block.courses)) {
                const splitCourses = [];
                let columnIndex = 0;
                for (let i = 0; i < COURSES_COLUMNS; i++) {
                    splitCourses.push([]);
                }
                block.courses.forEach((course) => {
                    splitCourses[columnIndex].push(course);
                    columnIndex++;
                    if (columnIndex >= COURSES_COLUMNS) {
                        columnIndex = 0;
                    }
                });
                block.courses = splitCourses;
            }
        });
    }

    PREPEND_SUMMARY_CATEGORIES.forEach((category) => {
        if (resume[category] !== undefined) {
            resume[category].forEach((block) => {
                if (block.highlights === undefined) {
                    block.highlights = [];
                }
                block.highlights = block.highlights.map(hl => new Handlebars.SafeString(hl));
            });
        }
    });

    const css = fs.readFileSync(`${__dirname  }/style.css`, "utf-8");
    const tpl = fs.readFileSync(`${__dirname  }/resume.hbs`, "utf-8");
    return Handlebars.compile(tpl)({
        css,
        resume
    });
}

module.exports = {
    render
};
