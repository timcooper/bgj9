module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('save', JSON.stringify({
    	"sub": {
	    	"attributes": {
	    		"health":    30,
	    		"maxHealth": 100,
	    		"repairRate": 1,
	    		"maxInventory": 50
	    	},
	    	"inventory": {
	    		"materials": 10
	    	}
    	},
    	"drone": {
    		"docked": true,
    		"dead": false,
	    	"attributes": {
	    		"health":    20,
	    		"maxHealth": 20,
	    		"charge":    20,
	    		"maxCharge": 20,
	    		"maxInventory": 20,
	    		"repairRate": 2
	    	},
	    	"inventory": {
	    		"materials": 0
	    	}
	    },
	    "messages": [
	    	"Deploy your drone to scavenge for repair supplies"
	    ],
	    "time": {
	    	"remains": 24,
	    	"total": 24
	    },
	    "dead": false
    }));
  }
};