//
// 絶対音感の練習のために和音をランダムに再生
// Soundfont-playerを使う
// Toshiyuki Masui 2024/8/17
//

var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
var nums = ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
var notelist = []
for(var i=0; i<notes.length; i++){
    for(var j=0; j<nums.length; j++){ 
	notelist[i*notes.length+j] = notes[j] + nums[i]
    }
}

// MIDIノート番号からn個をランダム選択
function randomNotes(n){
    if(!n){ n = 3 } // デフォルトは3音
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
    return a.slice(0,n).sort()
}

var ctx = new AudioContext()
var soundFont = new Soundfont(ctx)
var instrument = 'flute'
var playNotes = ['C4', 'E4', 'G4']

document.getElementById('play').addEventListener("click", function(e) {
    showNotes('')
    var l = randomNotes()
    playNotes = [notelist[l[0]], notelist[l[1]], notelist[l[2]]]

    var instrumentMenu = document.getElementById("instruments")
    var num = instrumentMenu.selectedIndex
    instrument = instrumentMenu.options[num].innerText

    play()
})

document.getElementById('again').addEventListener("click", function(e) {
    showNotes('')

    var instrumentMenu = document.getElementById("instruments")
    var num = instrumentMenu.selectedIndex
    instrument = instrumentMenu.options[num].innerText

    play()
})

document.getElementById('show').addEventListener("click", function(e) {
    showNotes(playNotes.join(' '))
})

function showNotes(s){ // 音を表示
    document.getElementById('notes').innerHTML = s
}

function play(){
    inst = soundFont.instrument(instrument)
    var time = ctx.currentTime + 0.1
    inst.play(playNotes[0], time, 2.0)
    inst.play(playNotes[1], time, 2.0)
    inst.play(playNotes[2], time, 2.0)
}
