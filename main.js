kaboom({
    width: 600,
    height: 600
})
loadSound("Bgmusic","gamemusic.mp3")
loadSound("score","coin.mp3")
loadSprite("Woman","pixil-frame-0 (2).png")
loadSprite("Tree", "tree.png")
loadSprite("Apple","apple.png")
setGravity(1500)

add([
    sprite("Tree"),
    scale(0.7)
])

const apple = add([
    sprite("Apple"),
    pos(Math.floor(Math.random() * width() - 80),0),
    area(scale(0.3)),
    scale(2),
    "Apple"
])

const player = add([
    sprite("Woman"),
    pos(160,140),
    area(scale(0.5)),
    scale(0.3),
    body(),
])

jump_counter = 0
score = 0
counter = 0

onKeyPress("space", () => {
    if (jump_counter < 2) {
        player.jump()
    }
    jump_counter += 1
})

onKeyDown("left", () => {
    player.pos.x -= 2
})

onKeyDown("right", () => {
    player.pos.x += 2
})

onUpdate(() => {
    if (player.pos.y > 300) {
        player.pos.y = 300
    }
    if (player.pos.y === 300) {
        jump_counter = 0
    }
    
    apple.pos.y += 2
    if (apple.pos.y > 600){
        destroy(apple)
        counter = 1
    }
    if (counter === 1){
        scorelaber.text = "Your final score is " + score
    }
    else {
        scorelaber.text = score
    }
})


player.onCollide("Apple", () => {
    apple.pos.y -= 300
    apple.pos.x = 0
    apple.pos.x += Math.floor(Math.random() * width() - 80)
    score += 1
    play("score",{
        volume:0.2
    })
})

const scorelaber = add([
    text(score),
    pos(30,30)
])

const music = play("Bgmusic", {
    volume: 0.4,
    loop: true
})