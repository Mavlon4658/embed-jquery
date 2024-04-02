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

        if (!$(el).hasClass('enable')) {
            editor.setReadOnly(true);
        }

        $(el).find('.run-code').click(function () {
            let code = editor.getValue();
            console.log(code);
        })

        $(el).find('.full_screen').click(function () {
            if ($(el).hasClass('active')) {
                $(el).removeClass('active');
                $('body').css({overflow: 'visible'});
            } else {
                $(el).addClass('active');
                $('body').css({overflow: 'hidden'});
            }
        })
        
        editor.on('change', function () {
            if ($(el).hasClass('active')) {
                editor.container.style.height = `${window.innerHeight - 50}px`;
                editor.resize();
            }
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

    $('.task_one__navs_length__item').each(function (idx, el) {
        $(el).find('.less span').click(function () {
            $('.less_list').not($(el).find('.less_list')).slideUp(300);
            $(el).find('.less_list').slideToggle(300);
        })
    })

    $('.task_one__navs').hover(
        function () {
            $('.task_one__navs').addClass('active')
            $('.task_one__navs_length__item').each(function (idx, el) {
                let t = false;

                $(el).find('.less_list button').each(function (btn_idx, btn_el) {
                    if ($(btn_el).hasClass('active')) {
                        t = true;
                    }
                })
                if (t) {
                    $(el).find('.less_list').slideDown(300);
                }
            })
        },
        function () {
            $('.task_one__navs').removeClass('active')
            $('.less_list').slideUp(300);
        }
    )
})
