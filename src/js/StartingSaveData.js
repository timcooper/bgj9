module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('save', JSON.stringify({
    	"sub": {
	    	"attributes": {
	    		"health":    30,
	    		"maxHealth": 100,
	    		"maxInventory": 100
	    	},
	    	"inventory": {
	    		"materials": 10
	    	}
    	},
    	"drone": {
	    	"attributes": {
	    		"health":    100,
	    		"maxHealth": 100,
	    		"charge":    100,
	    		"maxCharge": 100,
	    		"maxInventory": 20
	    	},
	    	"inventory": {
	    		"materials": 0
	    	}
	    },
	    "messages": [
	    	"Deploy your drone to scavenge for repair supplies"
	    ],
	    "time": {
	    	"remains": 48,
	    	"total": 48
	    }
    }));
  }
};