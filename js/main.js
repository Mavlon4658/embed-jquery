let theme = localStorage.getItem('theme');
let body = document.querySelector('body');

if (!theme) {
    darkTheme();
}

if (theme == 'dark') {
    darkTheme();
}

if (theme == 'light') {
    lightTheme();
}

console.log(localStorage.getItem('theme'));

function darkTheme () {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark')
}

function lightTheme () {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light')
}

$(document).ready(function () {
    
    $('.change_theme__btn').click(function () {
        $('.change_theme ul').slideToggle(300);
        $(this).toggleClass('active')
    })

    if (body.classList.contains('light-theme')) {

        $('.change_theme ul li button').removeClass('active');
        $($('.change_theme ul li button')[0]).addClass('active');
    }

    $('.change_theme ul li button').each(function (idx, el) {
        $(el).click(function () {
            if (idx == 0) {
                lightTheme();
            }
            
            if (idx == 1) {
                darkTheme();

            }
            $('.change_theme ul li button').not($(el)).removeClass('active');
            $(el).addClass('active');
            $('.change_theme ul').slideUp(300);
        })
    })

    $('.lesson_list__title').each(function (idx, el) {
        $(el).click(function () {
            $('.lesson_list__child').not($('.lesson_list__child')[idx]).slideUp(300);
            $($('.lesson_list__child')[idx]).slideToggle(300);
        })
    })

    $('.editor_wrap').each(function (idx, el) {
        let editor = ace.edit($(el).find('.code-editor')[0]);
    
        editor.setOptions({
            useWrapMode: true,
            highlightActiveLine: false,
            showPrintMargin: false,
            theme: 'ace/theme/monokai',
            mode: 'ace/mode/python',
        })

        editor.setReadOnly(true);

        console.log(ace.require("ace/ext/themelist"));

        $(el).find('.run-code').click(function () {
            let code = editor.getValue();
            console.log(code);
        })
    })

    $('.tasks_wrap .tasks_wrap__item').each(function (idx, el) {
        $(el).find('span').click(function () {
            $('.tasks_wrap .child_tasks').not($(el).find('.child_tasks')).slideUp(300)
            $(el).find('.child_tasks').slideDown(300);
        })
    })

    $('.btn_like').click(function() {
        $(this).toggleClass('active')
    })
})
