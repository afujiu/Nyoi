
onmessage = function(e) {
	if(e["data"]!=null){
		if(e.data!=null){
			let message="workerは正常に動作"
			this.postMessage(
				{
					status:message,
					result:e.data.data,
					time:e.data.time
				}
			)
		}
	}
  }