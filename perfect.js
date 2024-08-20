//
// 絶対音感の練習のために和音をランダムに再生
// Soundfont-playerを使う
// Toshiyuki Masui 2024/8/17
//

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const nums = ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const notelist = []
var nnotes = 3
for(var i=0; i<nums.length; i++){ 
    for(var j=0; j<notes.length; j++){
	notelist[i*notes.length+j] = notes[j] + nums[i]
    }
}

// MIDIノート番号からnnotes個をランダム選択
function randomNotes(){
    var a = []
    var i
    for(i=0;i<26;i++){
	a[i] = 55 + i // MIDIノート番号
    }
    // シャッフル
    for(i = a.length - 1; i > 0; i--){
	var r = Math.floor(Math.random() * (i + 1))
	// alert(r)
	// [a[i], a[r]] = [a[r], a[i]] // swap
	var tmp = a[i]
	a[i] = a[r]
	a[r] = tmp
    }
    return a.slice(0,nnotes).sort()
}

var instrument = 'flute'
var ctx = new AudioContext()
var soundFont = new Soundfont(ctx)
var playNotes = ['C4', 'E4', 'G4', 'A4', 'C5']

//var inst = soundFont.instrument('flute')

document.getElementById('instruments').addEventListener("change", function(e) {
    instrument = e.target.value
})
document.getElementById('nnotes').addEventListener("change", function(e) {
    nnotes = parseInt(e.target.value)
})

document.getElementById('play').addEventListener("click", function(e) {
    showNotes('')
    while(true){
        var l = randomNotes()
    	playNotes = []
	for(var i=0;i<nnotes;i++){
	    playNotes.push(notelist[l[i]])
	}
        // 同じ音が出ないように工夫
	var dup = {}
	var count = 0
	for(var i=0;i<nnotes;i++){
	    //alert(playNotes[i])
	    var c = playNotes[i].match(/^(.*)\d+$/)[1]
	    //alert(c)
	    if(dup[c]){
		count += 1
            }
	    dup[c] = true
        }
	//alert(`count = ${count}`)
        if(count == 0) break
    }
    play()
})

document.getElementById('again').addEventListener("click", function(e) {
    showNotes('')
    play()
})

document.getElementById('show').addEventListener("click", function(e) {
    showNotes(playNotes.join(' '))
})

function showNotes(s){ // 音を表示
    document.getElementById('notes').innerHTML = s
}

function play(){
    Soundfont.instrument(ctx, instrument).then(function (inst) {
	var time = ctx.currentTime + 0.1
	for(var i=0;i<nnotes;i++){
	    inst.play(playNotes[i], time, 2.0)
	}
    })
}
