//
//
//
var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var nums = ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var notelist = [];
for(var i=0; i<11; i++){
    for(var j=0; j<12; j++){
	notelist[i*12+j] = notes[j] + nums[i];
    }
}

function randomNotes(){
    var a = [];
    var i;
    // MIDIノート番号からいくつかをランダム選択
    for(i=0;i<18;i++){
	a[i] = 60 + i; // MIDIノート番号
    }
    // シャッフル
    for(i = a.length - 1; i > 0; i--){
	var r = Math.floor(Math.random() * (i + 1));
	var tmp = a[i];
	a[i] = a[r];
	a[r] = tmp;
    }
    return a.slice(0,3).sort();
}


var ctx = new AudioContext();
var soundFont = new Soundfont(ctx);
var inst = soundFont.instrument('flute');
var playnotes;

document.getElementById('play').addEventListener("click", function(e) {
    document.getElementById('notes').innerHTML = '';
    var l = randomNotes();
    playnotes = [notelist[l[0]], notelist[l[1]], notelist[l[2]]];
    var time = ctx.currentTime + 0.1;
    inst.play(playnotes[0], time, 2.0);
    inst.play(playnotes[1],time, 2.0);
    inst.play(playnotes[2], time, 2.0);
});

document.getElementById('again').addEventListener("click", function(e) {
    document.getElementById('notes').innerHTML = '';
    var time = ctx.currentTime + 0.1;
    inst.play(playnotes[0], time, 2.0);
    inst.play(playnotes[1],time, 2.0);
    inst.play(playnotes[2], time, 2.0);
});

document.getElementById('show').addEventListener("click", function(e) {
    document.getElementById('notes').innerHTML = playnotes.join(' ');;
});
