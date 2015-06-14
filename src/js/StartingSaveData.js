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
	    		"materials": 40
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
	    		"materials": 5
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