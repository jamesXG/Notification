let voice_1 = document.getElementById('notice_1'); // 无语音
let voice_2 = document.getElementById('notice_2'); // 有语音

voice_1.onclick = function() {
	notice({ title: '新提示', content: '您有新的美团外卖订单' });
};
voice_2.onclick = function() {
	notice({ title: '新提示', content: '您有新的美团外卖订单', play: true });
};
// 封装API
function notice({ title = '新通知', content = '您有新的通知', play = false }) {
	let options = {
    body: content, // 通知显示内容
    silent: true,
    sound: 'https://bs.xcang.xyz/voice/notice_test.mp3',
		requireInteraction: false, // 是否一直显示通知
		icon: 'https://bs.xcang.xyz/image/icon.jpeg' // 通知显示的图片
	};
	// 生成audio
	let audio = document.createElement('audio');
	// 音频地址
	audio.src = 'https://bs.xcang.xyz/voice/notice_test.mp3';
	// 先检查浏览器是否支持该API
	if (!('Notification' in window)) {
		alert('抱歉，该浏览器不支持Notification API');
	} else {
		let permission = Notification.permission;
		// 判断用户是否允许接受通知
		if (permission === 'granted') {
			// 同意
			let notice = new Notification(title, options);
      play && audio.play();
		} else if (permission === 'default') {
			// 继续向用户询问是否允许接受通知
			Notification.requestPermission().then((res) => {
				if (res === 'granted') {
					// 同意
					let notice = new Notification(title, options);
          play && audio.play();
				}
			});
		} else {
			// 拒绝
			console.log('用户拒绝了');
		}
  }
}
