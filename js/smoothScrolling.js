////////////////////////// stop scroll ///////////////////////////////////

const add_stopScrolling = () => {
    document.body.style.cssText += 'height: 100%; overflow-y: hidden;'
}

const remove_stopScrolling = () => {
    document.body.style.cssText -= 'height: 100%; overflow-y: hidden;'
}

////////////////////////////// loading /////////////////////////////

add_stopScrolling()
let loading = document.getElementById('loading')
loading.style.display = 'flex;'

////////////////////////// initail ////////////////////////////
let start_position
let end_position
let moveAble = false
let stop_parallax = false
let container_section
let sections = []


const windowHeight = window.innerHeight
const windowWidth = window.innerWidth
const screenHeight = screen.height
const screenWidth = screen.width

console.log('WW: ' + windowWidth)
console.log('WH: ' + windowHeight)
console.log('SW: ' + screenWidth)
console.log('SH: ' + screenHeight)

let start_building 
let start_title_name 
let start_embulance_X 
let start_embulance_Y
let start_semi_bg
let start_contn_data
let start_sectionOfcontainer
let ps


let building = document.getElementById('building')
let title_name = document.getElementById('title_name')
let embulance = document.getElementById('embulance')
let semi_bg = document.getElementById('semi_bg')
let contn_data = document.getElementById('contnOfdata')
let sectionOfcontainer = document.getElementById('sectionOfcontainer')
let titleName = document.querySelector('.navbar')
let left_arrow = document.getElementById('left_arrow')
let right_arrow = document.getElementById('right_arrow')
for (let i=0;i<8;i++) sections[i] = document.querySelector(`.section_heading${i+1}`)


//////////////////////////// start website ///////////////////////

setTimeout(async () => {
    start_contn_data = 0
    start_building = windowHeight
    start_title_name = windowHeight/2 - title_name.clientHeight/2
    start_embulance_X = embulance.getBoundingClientRect().right
    start_embulance_Y = start_building + building.clientHeight/1.8
    start_semi_bg = windowHeight + building.clientHeight/4 
    start_sectionOfcontainer = windowHeight + building.clientHeight/1.5 
    start_arrow = windowHeight/2 - left_arrow.clientHeight/2
    ps = start_semi_bg

    titleName.style.cssText += 'transform: translateY(0px); transition: .6s; opacity: 1;'
    left_arrow.style.top = `${start_arrow}px`
    right_arrow.style.top = `${start_arrow}px`
    contn_data.style.top = `${start_contn_data}px`
    title_name.style.top = `${start_title_name}px`
    building.style.top = `${start_building}px`
    embulance.style.top = `${start_embulance_Y}px`
    embulance.style.left = `${start_embulance_X}px`
    semi_bg.style.top = `${start_semi_bg}px`
    sectionOfcontainer.style.top = `${start_sectionOfcontainer}px`
    setTimeout (() => {
        window.scrollTo(0,0)
        setTimeout(async () => {
            start_position = await sections[0].getBoundingClientRect().top
            end_position = await sections[7].getBoundingClientRect().top
            moveAble = true
            loading.style.display = 'none'
            remove_stopScrolling()
        }, 1000) //200
    }, 1000)
}, 10)

let status_event = true
let state_page = 1
let targetPosition = 0
let scroll_down = 0

const smoothScroll = async (target, duration) => {
    target = await document.querySelector(target)
    targetPosition = await target.getBoundingClientRect().y 
    let startPosition = window.pageYOffset
    let distance = targetPosition 
    let startTime = null

    const animation = async (currentTime) => {
        if (startTime === null) startTime = currentTime
        let timeElapsed = currentTime - startTime
        let run = await ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
    }
    
    const ease = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) {
            return  c / 2 * t * t + b
        }
        t--
        return  -c / 2 * (t * (t - 2) - 1) + b 
    }
    requestAnimationFrame(animation)
} 

document.addEventListener('wheel', async (event) => {
    if (moveAble) scrolling_function(event.deltaY)
})


////////           /*/*/*/*/*/*/*/           //////
document.addEventListener('touchmove', (event) => {
    console.log('asd')
    // console.log(event.touches[0].screenY)
    // console.log(window.scrollY)
})

/////////////////// fixed ////////////////////////
// function detectTrackPad(e) {
//     var isTrackpad = false;
//     if (e.wheelDeltaY) {
//       if (Math.abs(e.wheelDeltaY) !== 120) {
//         isTrackpad = true;
//       }
//     }
//     else if (e.deltaMode === 0) {
//       isTrackpad = true;
//     }
//     console.log(isTrackpad ? "Trackpad detected" : "Mousewheel detected");
//   }
  
//   document.addEventListener("mousewheel", detectTrackPad, false);
//   document.addEventListener("DOMMouseScroll", detectTrackPad, false);
/////////////////// fixed ////////////////////////


const addfadeAnumate = async (target1, target2) => {
    let newtarget1 = await document.querySelector(target1)
    let newtarget2 = await document.querySelector(target2)

    newtarget1.classList.add("play_fadeAnimate")
    newtarget2.classList.add("play_fadeAnimate")
    setTimeout(() => {
        newtarget1.classList.remove("play_fadeAnimate")
        newtarget2.classList.remove("play_fadeAnimate")
    }, 1000)
}

const scrolling_function = (scrolled) => {
    if (scrolled > 0) {
        scroll_down = -1
        // console.log('down')
    }
    else if (scrolled < 0) {
        scroll_down = 1
        // console.log('up')
    }else scroll_down = 0
    if (window.pageYOffset >= start_position - 30 && window.pageYOffset <= end_position + 30) {
        if (scroll_down < 0 && status_event && state_page != 8) {
            status_event = false
            add_stopScrolling()
            smoothScroll(`.section_heading${state_page+1}`, 700)
            if (state_page !== 1 && state_page !== 2) addfadeAnumate(`.section_bg${state_page}`, `.section_bg${state_page+1}`)
            setTimeout(() => {
                state_page += 1
                status_event = true
                remove_stopScrolling()
            }, 1000);
        }
        else if (scroll_down > 0 && status_event && state_page != 1) {
            status_event = false
            add_stopScrolling()
            smoothScroll(`.section_heading${state_page-1}`, 700)
            if (state_page !== 1 && state_page !== 2 && state_page !== 3) addfadeAnumate(`.section_bg${state_page}`, `.section_bg${state_page-1}`)
            setTimeout(() => {
                state_page -= 1 
                status_event = true
                remove_stopScrolling()
            }, 1000);
        }
    }
}

////////////////////////// navbar ///////////////////////////////////////


document.addEventListener('scroll', () => {
    // console.log(window.pageYOffset)
    if (moveAble) {
        if (window.pageYOffset < 10) {
            titleName.style.cssText += 'transform: translateY(0px); transition: .6s; opacity: 1;'
        }else {
            titleName.style.cssText -= 'transform: translateY(-100px); transition: .6s; opacity: 0;'
        }
    }
})


/////////////////////// parallax //////////////////////////////////////
let content_s = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
]
document.addEventListener('scroll', (e) => {
    if (moveAble) {
        for (let i=0;i<8;i++) {
            if (i!==1) {
                let content = document.getElementById(`content_${i+1}`)
                if (content.getBoundingClientRect().top + window.scrollY - windowHeight/2 < window.scrollY) {
                    if(content_s[i]) {
                        content.style.animation = `content .8s ease-in-out forwards`
                        content_s[i] = false
                    }
                }else {
                    if(!content_s[i]) {
                        content.style.animation = `content-reverse .8s ease-in-out forwards`
                        content_s[i] = true
                    }
                }
            }
        }

        let desBuilding = building.getBoundingClientRect().top + building.clientHeight
        if (desBuilding < 0) {
            stop_parallax = true
        }
        else {
            stop_parallax = false
        }
        // console.log('stop_parallax: ' + stop_parallax)
        if (moveAble && !stop_parallax) {
            if (desBuilding > building.clientHeight*0.4) {
                building.style.top = `${start_building - window.scrollY * 0.5}px`
                title_name.style.top = `${start_title_name + window.scrollY * 0.4}px`
                title_name.style.opacity = `${title_name.getBoundingClientRect().top * 0.005}`
                left_arrow.style.opacity = `${title_name.getBoundingClientRect().top * 0.005}`
                right_arrow.style.opacity = `${title_name.getBoundingClientRect().top * 0.005}`
                embulance.style.top = `${start_embulance_Y - window.scrollY * 0.5}px`
            }
            embulance.style.left = `${start_embulance_X - window.scrollY * 1.8}px`
        }
    }
})

//////////////////////   move letf or right  /////////////////

let stor_img_part = [
    '../images/bg_head_1.jpg',
    '../images/bg_head_2.jpg',
    '../images/bg_head_3.jpg',
    '../images/bg_head_4.jpg',
    '../images/bg_head_5.jpg',
]
let state_bg = 0
let bg_header = document.querySelector('.bg_header')

left_arrow.addEventListener('click', async () => {
    state_bg--
    if (state_bg < 0) state_bg = 4
    bg_header.classList.add("play_fadeAnimate")
    setTimeout(() => {
        bg_header.classList.remove("play_fadeAnimate")
    }, 1000)
    bg_header.style.backgroundImage = `url('${stor_img_part[state_bg]}')`;
})

right_arrow.addEventListener('click', async () => {
    state_bg++
    console.log(state_bg)
    if (state_bg > 4) state_bg = 0
    bg_header.classList.add("play_fadeAnimate")
    setTimeout(() => {
        bg_header.classList.remove("play_fadeAnimate")
    }, 1000)
    bg_header.style.backgroundImage = `url('${stor_img_part[state_bg]}')`;
})

//////////////////////   see more  /////////////////
let btn_change = document.querySelector('.btn_change')
let btn_drive = document.querySelector('.btn_drive')
let btn_diary = document.querySelector('.btn_diary')
btn_change.addEventListener('click', () => {
    // console.log(document.URL)
    window.location.href=(`${document.URL.replace("AccidentsInPregnantWomen", "seemorechange")}`);
})
btn_drive.addEventListener('click', () => {
    // console.log(document.URL)
    window.location.href=(`${document.URL.replace("AccidentsInPregnantWomen", "seemoredrive")}`);
})
btn_diary.addEventListener('click', () => {
    // console.log(document.URL)
    window.location.href=(`${document.URL.replace("AccidentsInPregnantWomen", "seemorediary")}`);
})



              
        
