function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

angular.module('smrpg.controllers', [])

.controller('AppCtrl', function($scope) {
	  $scope.tasks = [
	      { title: 'Dr. Topper Quiz (J)', id: 1 },
	      { title: 'Dr. Topper Quiz (U)', id: 9 },
	      { title: 'Marathon', id: 2 },
	      { title: 'J-to-E Item Names', id: 13 },
	      { title: 'E-to-J Item Names', id: 15 },
	      { title: 'Ball Solitaire', id: 3 },
	      { title: 'Star Hill Flowers', id: 10 },
	      { title: '21 Coin Game', id: 4 },
	      /*{ title: 'Peach Chart 1.07', id: 5 },*/
	      { title: 'Item index', id: 6 },
	      { title: 'Levelup rules', id: 11 },
	      { title: 'List of any% menus', id: 12 },
	      { title: 'List of kanji', id: 7 }
	      /*{ title: 'Game script', id: 8 }*/
	    ];
	  
	  $scope.openLink = function(url) {
		  if (window.cordova) {
			  window.open(url,'_system','location=yes'); 
		  }
		  else {
			  window.open(url, '_blank'); return false;
		  }
	  }
})

.controller('HomeCtrl', function($scope) {
})
.controller('LevelCtrl', function($scope) {
})
.controller('MenusCtrl', function($scope) {
})
.controller('MenuSimCtrl', function($scope, $state, $ionicNavBarDelegate, $timeout, $ionicScrollDelegate, $window) {
	
	class Item {
		constructor(id, uname, jname, udesc, jdesc, freebie, icon, weight, type, buy, sell, usedBy = null, statBoosts = null) {
			this.id = id;
			this.type = type;
			this.name = {"U": uname, "J": jname};
			this.desc = {"U": udesc, "J": jdesc};
			this.freebie = freebie;
			this.icon = icon;
			this.weight = weight;
			this.buy = buy;
			this.sell = sell;
			this.usedBy = usedBy;
			this.statBoosts = statBoosts;
		}
	}
	class Character {
		constructor(id, uname, jname, level, atk, def, matk, mdef, totalhp, equips = {"weapon": null, "armor": null, "accessory": null}) {
			this.id = id;
			this.name = {"U": uname, "J": jname};
			this.level = level;
			this.atk = atk;
			this.def = def;
			this.matk = matk;
			this.mdef = mdef;
			this.currenthp = totalhp;
			this.totalhp = totalhp;
			this.equips = equips;
		}
	}
	
	$scope.getMenuPort = function(param) {
		var height = $window.innerHeight;
		var width = $window.innerWidth;
		var calculatedHeight = (width / 256) * 224;
		if (calculatedHeight > height * 0.6) {
			calculatedHeight = height * 0.6;
			calculatedWidth = (calculatedHeight / 224) * 256;
		}
		else
			calculatedWidth = width;
		if (param == "height")
			return calculatedHeight;
		else
			return calculatedWidth;
	}
	
	$scope.menus = [
	                {
	                	"name": "Mushroom Kingdom Shop",
	                	"id": 0,
	                	"type": "shop"
	                },
	                {
	                	"name": "Tadpole Pond Shop (Right)",
	                	"id": 1,
	                	"type": "shop"
	                },
	                {
	                	"name": "Tadpole Pond Shop (Left)",
	                	"id": 2,
	                	"type": "shop"
	                },
	                {
	                	"name": "Rose Town Shop",
	                	"id": 3,
	                	"type": "shop"
	                },
	                {
	                	"name": "Moleville Shop",
	                	"id": 4,
	                	"type": "shop"
	                },
	                {
	                	"name": "Booster Tower (after curtain)",
	                	"id": 5,
	                	"type": "x"
	                },
	                {
	                	"name": "Seaside Frog Coin Shop",
	                	"id": 6,
	                	"type": "shop"
	                },
	                {
	                	"name": "Seaside Menu (TM)",
	                	"id": 7,
	                	"type": "shop"
	                },
	                {
	                	"name": "Sea Star",
	                	"id": 8,
	                	"type": "x"
	                },
	                {
	                	"name": "Post Sea Star, Pre Kalimari",
	                	"id": 9,
	                	"type": "x"
	                },
	                {
	                	"name": "Sunken Ship Secret Room",
	                	"id": 10,
	                	"type": "x"
	                },
	                {
	                	"name": "Sunken Ship Post-Bandanas, Pre-Johnny",
	                	"id": 11,
	                	"type": "x"
	                },
	                {
	                	"name": "Sunken Ship Post-Johnny, Pre-Yaridovich",
	                	"id": 12,
	                	"type": "x"
	                },
	                {
	                	"name": "Seaside Town Post-Yaridovich",
	                	"id": 13,
	                	"type": "shop"
	                },
	                {
	                	"name": "Land's End Menu",
	                	"id": 14,
	                	"type": "x"
	                },
	                {
	                	"name": "Nimbus Shop",
	                	"id": 15,
	                	"type": "shop"
	                },
	                {
	                	"name": "Barrel Volcano Star",
	                	"id": 16,
	                	"type": "x"
	                },
	                {
	                	"name": "Barrel Volcano Post-Corkpedite",
	                	"id": 17,
	                	"type": "x"
	                },
	                {
	                	"name": "Barrel Post-Czar, Pre-Axems",
	                	"id": 18,
	                	"type": "x"
	                },
	                {
	                	"name": "Pre-Magikoopa",
	                	"id": 19,
	                	"type": "x"
	                },
	                {
	                	"name": "Pre-Countdown",
	                	"id": 20,
	                	"type": "x"
	                },
	                {
	                	"name": "Post-Countdown, Pre-MMY",
	                	"id": 21,
	                	"type": "x"
	                },
	                {
	                	"name": "Post-Earthlink, Pre Inner Factory",
	                	"id": 22,
	                	"type": "x"
	                },
	                {
	                	"name": "Post-Manager, Pre-Director",
	                	"id": 23,
	                	"type": "x"
	                }
	            ];
	
	Array.prototype.sortItems = function() {
		this.sort(function(a, b) {
			return a.weight - b.weight;
		});
	}
	Array.prototype.useItem = function(index, sell = false) {
		if (sell === true) 
			$scope.coins += this[index].sell;
		if ($scope.coins > 999)
			$scope.coins = 999;
		if (sell !== 'trash') {
			if (this[index].name.U.toLowerCase().indexOf("syrup") >= 0) {
				$scope.currentFlowers = $scope.totalFlowers;
			}
		}
		if (sell === "battle") {
			var rng = Math.random();
			if (rng > this[index].freebie)
				this.splice(index, 1);
		}
		else
			this.splice(index, 1);
	}
	Array.prototype.getIndex = function(id) {
		var arr = this.find(function(item) {
			return item.id == id;
		})
		if (arr !== undefined)
			return this.indexOf(arr);
		else
			return -1;
	}
	
	function partySwap(from, to) {
		charA = $scope.party[from];
		charB = $scope.party[to];
		$scope.party[from] = charB;
		$scope.party[to] = charA;
	}
	
	function equipSwap(from, to) {
		if (from.parent == "free" && to.parent == "free") {
			return;
		}
		else if (from.parent == "free" && to.parent != "free") {
			movingItem = $scope.equips[from.index];
			if ($scope.party[to.parent].equips[to.index] != null)
				swappedItem = $scope.party[to.parent].equips[to.index];
			else
				swappedItem = null;
			$scope.party[to.parent].equips[to.index] = movingItem;
			$scope.equips.useItem($scope.equips.getIndex(movingItem.id));
			if (swappedItem != null)
				$scope.equips.addItem(swappedItem.id);
		}
		else if (from.parent != "free" && to.parent == "free") {
			if ($scope.party[from.parent].equips[from.index] != null)
				movingItem = $scope.party[from.parent].equips[from.index];
			else
				movingItem = null;
			if (to.index >= $scope.equips.length || to.index == null)
				swappedItem = null;
			else
				swappedItem = $scope.equips[to.index];
			if (movingItem != null)
				$scope.equips.addItem(movingItem.id);
			if (swappedItem != null)
				$scope.equips.useItem(to.index);
			$scope.party[from.parent].equips[from.index] = swappedItem;
			
		}
		else if (from.parent != "free" && to.parent != "free") {
			if ($scope.party[from.parent].equips[from.index] != null)
				movingItem = $scope.party[from.parent].equips[from.index];
			else
				movingItem = null;
			if ($scope.party[to.parent].equips[to.index] != null)
				swappedItem = $scope.party[to.parent].equips[to.index];
			else
				swappedItem = null;
			$scope.party[to.parent].equips[to.index] = movingItem;
			$scope.party[from.parent].equips[from.index] = swappedItem;
			if (movingItem.usedBy.indexOf($scope.party[to.parent].id) < 0) {
				$scope.equips.addItem(movingItem.id);
				$scope.party[to.parent].equips[from.index] = null;
			}
		}
		$scope.equips.sortItems();
	}
	
	Array.prototype.addItem = function(item, buy = false) {
		var newItem;
		if (item == "Hammer")
			newItem = new Item(item, "Hammer", 'ハンマー', 'Pounds enemies', 'たたいてつぶします', 0, 'hammer', 5, 'weapon', null, 35, ["Mario"], {"atk": 10});
		else if (item == "NokNok Shell")
			newItem = new Item(item, "NokNok Shell", 'ノコノコこうら', 'Kick to attack', 'けとばして、てきを<br>こうげきします', 0, 'shell', 7, 'weapon', 20, 10, ["Mario"], {"atk": 20});
		else if (item == "Punch Glove")
			newItem = new Item(item, "Punch Glove", 'パンチグローブ', 'Knock out<br>power!', 'つよいパンチを<br>おみまいします', 0, 'glove', 8, 'weapon', 36, 18, ["Mario"], {"atk": 30});
		else if (item == "Super Hammer")
			newItem = new Item(item, "Super Hammer", 'スーパーハンマー', 'The standard<br>for hammers!', 'スーパーなハンマーです', 0, 'hammer', 14, 'weapon', 70, 35, ["Mario"], {"atk": 40});
		else if (item == "Masher")
			newItem = new Item(item, "Masher", 'ムラっけハンマー', 'Makes monster<br>mash!', 'ダメージにとてもムラの<br>あるハンマーです', 0, 'hammer', 12, 'weapon', null, 80, ["Mario"], {"atk": 50});
		else if (item == "Troopa Shell")
			newItem = new Item(item, "Troopa Shell", 'パタパタこうら', 'Kick with it!', 'けとばして、てきを<br>こうげきします', 0, 'shell', 18, 'weapon', 90, 45, ["Mario"], {"atk": 50});
		else if (item == "Lucky Hammer")
			newItem = new Item(item, "Hammer", 'ハンマー', 'A lucky hammer!', 'ハンマーチャーンス！', 0, 'hammer', 35, 'weapon', 123, 61, ["Mario"], {});
		else if (item == "Mega Glove")
			newItem = new Item(item, "Mega Glove", 'でかパンチグローブ', 'Packs a mega<br>wallop!', 'でっかいパンチで<br>こうげきします', 0, 'glove', 24, 'weapon', 102, 51, ["Mario"], {"atk": 60});
		else if (item == "Ultra Hammer")
			newItem = new Item(item, "Ultra Hammer", 'ウルトラハンマー', 'The ultimate<br>hammer!', 'ウルトラなハンマーです', 0, 'hammer', 28, 'weapon', null, 57, ["Mario"], {"atk": 70});
		else if (item == "Lazy Shell (W)")
			newItem = new Item(item, "Lazy Shell", 'ひまんパタこうら', 'Toss a shell<br>at an enemy!', 'けとばして、てきを<br>こうげきします', 0, 'shell', 33, 'weapon', null, 100, ["Mario"], {"atk": 90});
		else if (item == "FroggieStick")
			newItem = new Item(item, "FroggieStick", 'ケロケロのつえ', 'Frogfucius<br>made it', 'カエルせんにんの<br>手づくりです', 0, 'stick', 6, 'weapon', null, 90, ["Mallow"], {"atk": 20});
		else if (item == "Cymbals")
			newItem = new Item(item, "Cymbals", 'シンバル', 'Scare enemies<br>with a clash', '大きな音を出します', 0, 'music', 10, 'weapon', 42, 21, ["Mallow"], {"atk": 30});
		else if (item == "Whomp Glove")
			newItem = new Item(item, "Whomp Glove", 'のびパンチグローブ', 'The old double<br>whammie!', 'ダブルなのびパンチで<br>こうげきします', 0, 'glove', 16, 'weapon', 72, 36, ["Mallow"], {"atk": 40});
		else if (item == "Ribbit Stick")
			newItem = new Item(item, "Ribbit Stick", 'ゲコゲコのつえ', 'It’ll come<br>in handy', 'カエルじるしの<br>たよりになるやつです', 0, 'stick', 22, 'weapon', 86, 43, ["Mallow"], {"atk": 50});
		else if (item == "Sticky Glove")
			newItem = new Item(item, "Sticky Glove", 'くっつきグローブ', 'Launches a<br>punch attack.', 'マッチョでヘビーな<br>パンチでこうげきです', 0, 'glove', 27, 'weapon', 98, 49, ["Mallow"], {"atk": 60});
		else if (item == "Sonic Cymbals")
			newItem = new Item(item, "Sonic Cymbals", 'ソニックシンバル', 'Puts noise to<br>work for you!', '大きな音でこうげきです', 0, 'music', 32, 'weapon', null, 54, ["Mallow"], {"atk": 70});
		else if (item == "Finger Shot")
			newItem = new Item(item, "Finger Shot", 'フィンガーショット', 'Fingers shoot<br>bullets', 'ゆびの先から玉を<br>はっしゃします', 0, 'geno', 9, 'weapon', 50, 25, ["Geno"], {"atk": 12});
		else if (item == "Hand Gun")
			newItem = new Item(item, "Hand Gun", 'ハンドガン', 'It packs a kick', '玉をはっしゃします', 0, 'geno', 15, 'weapon', 75, 37, ["Geno"], {"atk": 24});
		else if (item == "Double Punch")
			newItem = new Item(item, "Double Punch", 'スーパーダブルパンチ', 'A handy double<br>rocket punch', 'ダブルロケットパンチで<br>こうげきします', 0, 'glove', 21, 'weapon', 88, 44, ["Geno"], {"atk": 35});
		else if (item == "Hand Cannon")
			newItem = new Item(item, "Hand Cannon", 'ハンドキャノン', 'Shoots bullets<br>from elbow!', 'ヒジから玉をうちます', 0, 'geno', 26, 'weapon', 105, 52, ["Geno"], {"atk": 45});
		else if (item == "Star Gun")
			newItem = new Item(item, "Star Gun", 'スターガン', 'Try shooting<br>stars!', 'スターなガンです', 0, 'geno', 31, 'weapon', null, 60, ["Geno"], {"atk": 57});
		else if (item == "Chomp")
			newItem = new Item(item, "Chomp", 'ワンワン', 'Just spin me<br>at an enemy!', 'ブンブンふりまわして<br>こうげきします', 0, 'chomp', 11, 'weapon', null, 70, ["Bowser"], {"atk": 10});
		else if (item == "Chomp Shell")
			newItem = new Item(item, "Chomp Shell", 'ワンワンのぬけがら', 'It’s a<br>Kinklink shell', 'ワンワンのぬけがらです<br>本物があれば必要なし', 0, 'chomp', 13, 'weapon', 60, 30, ["Bowser"], {"atk": 9});
		else if (item == "Hurly Gloves")
			newItem = new Item(item, "Hurly Gloves", 'ぶんなげグローブ', 'A classic<br>Mario-toss<br>attack', 'マリオをぶん投げて<br>こうげきします', 0, 'glove', 20, 'weapon', 92, 46, ["Bowser"], {"atk": 20});
		else if (item == "Spiked Link")
			newItem = new Item(item, "Spiked Link", 'トゲワンワン', 'A studded ball<br>and chain!', 'トゲつきワンワンを<br>ふりまわします', 0, 'chomp', 23, 'weapon', 94, 47, ["Bowser"], {"atk": 30});
		else if (item == "Drill Claw")
			newItem = new Item(item, "Drill Claw", 'ドリルクロー', 'A drilling<br>claw!', 'ドリルなクローです', 0, 'glove', 30, 'weapon', null, 20, ["Bowser"], {"atk": 40});
		else if (item == "Slap Glove")
			newItem = new Item(item, "Slap Glove", 'ビンタグローブ', 'It slaps ’em<br>silly', 'プリンセスなビンタで<br>こうげきします', 0, 'glove', 17, 'weapon', null, 50, ["Peach"], {"atk": 40});
		else if (item == "Parasol")
			newItem = new Item(item, "Parasol", 'パラソル', 'Inflicts<br>serious pain!', 'あたるとけっこういたい<br>です', 0, 'stick', 19, 'weapon', 84, 42, ["Peach"], {"atk": 50});
		else if (item == "War Fan")
			newItem = new Item(item, "War Fan", 'センス', 'A mysterious<br>battle fan!', 'ハイセンスなセンスで<br>ハリセンこうげきです', 0, 'fan', 25, 'weapon', 100, 50, ["Peach"], {"atk": 60});
		else if (item == "Super Slap")
			newItem = new Item(item, "Super Slap", 'ちょービンタグローブ', 'The Princess’<br>mega-slap!', '本気のプリンセスの<br>ビンタこうげきです', 0, 'glove', 29, 'weapon', null, 55, ["Peach"], {"atk": 70});
		else if (item == "Frying Pan")
			newItem = new Item(item, "Frying Pan", 'フライパン', 'Enough iron to<br>be dangerous!', '愛のフライパンで<br>おしおきです♥', 0, 'fan', 34, 'weapon', 300, 150, ["Peach"], {"atk": 90});
		else if (item == "Shirt")
			newItem = new Item(item, "Shirt", 'ふつうのつなぎ', 'It’s a<br>shirt!', 'ふつうのつなぎです', 0, 'armor', 37, 'armor', 7, 3, ["Mario"], {"def": 6, "mdef": 6});
		else if (item == "Thick Shirt")
			newItem = new Item(item, "Thick Shirt", 'しっかりつなぎ', 'A padded shirt', 'しっかりしたつなぎです', 0, 'armor', 39, 'armor', 14, 7, ["Mario"], {"def": 12, "mdef": 8});
		else if (item == "Mega Shirt")
			newItem = new Item(item, "Mega Shirt", 'ばっちりつなぎ', 'Durable stay-<br>pressed shirt', 'バッチリなつなぎです', 0, 'armor', 41, 'armor', 22, 11, ["Mario"], {"def": 18, "mdef": 10});
		else if (item == "Happy Shirt")
			newItem = new Item(item, "Happy Shirt", 'ハッピーつなぎ', 'A lucky shirt', 'えんぎのいいつなぎです', 0, 'armor', 45, 'armor', 38, 19, ["Mario"], {"def": 24, "mdef": 12});
		else if (item == "Sailor Shirt")
			newItem = new Item(item, "Sailor Shirt", 'セーラーつなぎ', 'A sailor’s<br>suit', '海の男のつなぎです', 0, 'armor', 50, 'armor', 50, 25, ["Mario"], {"def": 30, "mdef": 15});
		else if (item == "Fuzzy Shirt")
			newItem = new Item(item, "Fuzzy Shirt", 'ふかふかつなぎ', 'A fuzzy shirt', 'ふかふらのつなぎです', 0, 'armor', 55, 'armor', 70, 35, ["Mario"], {"def": 36, "mdef": 18});
		else if (item == "Fire Shirt")
			newItem = new Item(item, "Fire Shirt", 'ファイアつなぎ', 'Determined<br>person’s shirt', 'もえる男のつなぎです', 0, 'armor', 59, 'armor', 90, 45, ["Mario"], {"def": 42, "mdef": 21});
		else if (item == "Hero Shirt")
			newItem = new Item(item, "Hero Shirt", 'ヒーローつなぎ', 'A legendary<br>shirt.', '伝説のつなひです', 0, 'armor', 64, 'armor', 100, 50, ["Mario"], {"def": 48, "mdef": 24});
		else if (item == "Pants")
			newItem = new Item(item, "Pants", 'ふつうのパンツ', 'It’s a pair<br>of pants!', 'ふつうのパンツです', 0, 'armor', 38, 'armor', 7, 3, ["Mallow"], {"def": 6, "mdef": 3});
		else if (item == "Thick Pants")
			newItem = new Item(item, "Thick Pants", 'しっかいパンツ', 'Padded pants', 'しっかりしたパンツです', 0, 'armor', 40, 'armor', 14, 7, ["Mallow"], {"def": 12, "mdef": 6});
		else if (item == "Mega Pants")
			newItem = new Item(item, "Mega Pants", 'ばっちりパンツ', 'Durable work<br>pants', 'バッチリなパンツです', 0, 'armor', 42, 'armor', 22, 11, ["Mallow"], {"def": 18, "mdef": 9});
		else if (item == "Happy Pants")
			newItem = new Item(item, "Happy Pants", 'ハッピーパンツ', 'A lucky<br>pair of pants', 'えんぎのいいパンツです', 0, 'armor', 46, 'armor', 38, 19, ["Mallow"], {"def": 24, "mdef": 12});
		else if (item == "Sailor Pants")
			newItem = new Item(item, "Sailor Pants", 'セーラーパンツ', 'A sailor’s<br>pants', '海の男のパンツです', 0, 'armor', 51, 'armor', 50, 25, ["Mallow"], {"def": 30, "mdef": 15});
		else if (item == "Fuzzy Pants")
			newItem = new Item(item, "Fuzzy Pants", 'ふかふかパンツ', 'Fuzzy pants', 'ふかふかのパンツです', 0, 'armor', 56, 'armor', 70, 35, ["Mallow"], {"def": 36, "mdef": 18});
		else if (item == "Fire Pants")
			newItem = new Item(item, "Fire Pants", 'ファイアパンツ', 'Determined<br>person’s pants', 'もえる男のパンツです', 0, 'armor', 60, 'armor', 90, 45, ["Mallow"], {"def": 42, "mdef": 21});
		else if (item == "Prince Pants")
			newItem = new Item(item, "Prince Pants", 'プリンスパンツ', 'Legendary<br>pants!', '伝説のパンツです', 0, 'armor', 65, 'armor', 100, 50, ["Mallow"], {"def": 48, "mdef": 24});
		else if (item == "Mega Cape")
			newItem = new Item(item, "Mega Cape", 'ばっちりマント', 'Durable<br>pressed cape', 'バッチリなマントです', 0, 'armor', 44, 'armor', 22, 11, ["Geno"], {"def": 6, "mdef": 3});
		else if (item == "Happy Cape")
			newItem = new Item(item, "Happy Cape", 'ハッピーマント', 'A lucky cape', 'えんぎのいいマントです', 0, 'armor', 47, 'armor', 38, 19, ["Geno"], {"def": 12, "mdef": 6});
		else if (item == "Sailor Cape")
			newItem = new Item(item, "Sailor Cape", 'セーラーマント', 'A sailor’s<br>cape', '海の男のマントです', 0, 'armor', 52, 'armor', 50, 25, ["Geno"], {"def": 18, "mdef": 9});
		else if (item == "Fuzzy Cape")
			newItem = new Item(item, "Fuzzy Cape", 'ふかふかマント', 'A fuzzy cape', 'ふかふかのマンチです', 0, 'armor', 57, 'armor', 70, 35, ["Geno"], {"def": 24, "mdef": 12});
		else if (item == "Fire Cape")
			newItem = new Item(item, "Fire Cape", 'ファイアマント', 'Determined<br>person’s cape', 'もえる男のマントです', 0, 'armor', 61, 'armor', 90, 45, ["Geno"], {"def": 30, "mdef": 15});
		else if (item == "Star Cape")
			newItem = new Item(item, "Star Cape", 'スターマント', 'A legendary<br>cape.', '伝説のマントです', 0, 'armor', 66, 'armor', 100, 50, ["Geno"], {"def": 36, "mdef": 18});
		else if (item == "Happy Shell")
			newItem = new Item(item, "Happy Shell", 'ハッピーシェル', 'A lucky shell', 'えんぎのいいシェルです', 0, 'armor', 48, 'armor', 38, 19, ["Bowser"], {"def": 6, "mdef": 3});
		else if (item == "CourageShell")
			newItem = new Item(item, "CourageShell", 'むてきのこうら', 'A stout shell', 'おニューなこうらです', 0, 'armor', 54, 'armor', 60, 30, ["Bowser"], {"def": 12, "mdef": 6});
		else if (item == "Fire Shell")
			newItem = new Item(item, "Fire Shell", 'ファイアシェル', 'Determined<br>person’s shell', 'もえる男のこうらです', 0, 'armor', 62, 'armor', 90, 45, ["Bowser"], {"def": 18, "mdef": 9});
		else if (item == "Heal Shell")
			newItem = new Item(item, "Heal Shell", 'ヒールシェル', 'A legendary<br>shell.', '伝説のこうらです', 0, 'armor', 67, 'armor', 100, 50, ["Bowser"], {"def": 24, "mdef": 12});
		else if (item == "Polka Dress")
			newItem = new Item(item, "Polka Dress", 'ラブラブドレス', 'A flashy dress', 'ハデなドレスです', 0, 'armor', 49, 'armor', null, 80, ["Peach"], {"def": 24, "mdef": 12});
		else if (item == "NauticaDress")
			newItem = new Item(item, "NauticaDress", 'セーラードレス', 'A female<br>sailor’s dress', '海のレディのドレスです', 0, 'armor', 53, 'armor', 50, 25, ["Peach"], {"def": 30, "mdef": 15});
		else if (item == "Fuzzy Dress")
			newItem = new Item(item, "Fuzzy Dress", 'ふかふかドレス', 'A fuzzy dress', 'ふかふかのドレスです', 0, 'armor', 58, 'armor', 70, 35, ["Peach"], {"def": 36, "mdef": 18});
		else if (item == "Fire Dress")
			newItem = new Item(item, "Fire Dress", 'ファイアドレス', 'Determined<br>woman’s dress', 'もえる女のドレスです', 0, 'armor', 63, 'armor', 90, 45, ["Peach"], {"def": 42, "mdef": 21});
		else if (item == "Royal Dress")
			newItem = new Item(item, "Royal Dress", 'プリンセスドレス', 'A legendary<br>dress!', '伝説のドレスです', 0, 'armor', 68, 'armor', 100, 50, ["Peach"], {"def": 48, "mdef": 24});
		else if (item == "Work Pants")
			newItem = new Item(item, "Work Pants", 'ばっちいパンツ', 'Sweaty<br>work pants!', 'ちょっとにおうパンツだ', 0, 'armor', 43, 'armor', 22, 11, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"atk": 10, "def": 15, "matk": 10, "mdef": 5});
		else if (item == "Lazy Shell (A)")
			newItem = new Item(item, "Lazy Shell", 'ひまんパタこうら', 'A stout and<br>durable shell.', 'ガッチリガードの<br>たよれるこうらです', 0, 'armor', 70, 'armor', null, 111, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"atk": -50, "def": 127, "matk": -50, "mdef": 127});
		else if (item == "Super Suit")
			newItem = new Item(item, "Super Suit", 'スーパージャンパー', 'A truly fine<br>suit!', 'スーパースペシャルデリ<br>ジャスなジャンパーです', 0, 'armor', 69, 'armor', null, 350, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"atk": 50, "def": 50, "matk": 50, "mdef": 50});
		else if (item == "Amulet")
			newItem = new Item(item, "Amulet", 'ブッキーのおまもり', 'Great item,<br>bad smell!', 'ありがたい反面<br>ちょっと　におう‥', 0, 'accessory', 78, 'accessory', null, 100, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"atk": 7, "def": 7, "matk": 7, "mdef": 7});
		else if (item == "Antidote Pin")
			newItem = new Item(item, "Antidote Pin", 'どくふせぎバッジ', 'Prevents<br>poison damage', '毒ダメージをふせぎます', 0, 'accessory', 84, 'accessory', 28, 14, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 2, "mdef": 2});
		else if (item == "Attack Scarf")
			newItem = new Item(item, "Attack Scarf", 'ジャンパースカーフ', 'So comfy it’ll<br>make you jump!', 'きゅうきょくのジャンプ<br>とは「ジャンプ」なり', 0, 'accessory', 81, 'accessory', null, 750, ["Mario"], {"atk": 30, "def": 30, "matk": 30, "mdef": 30});
		else if (item == "B'Tub Ring")
			newItem = new Item(item, "B'Tub Ring", 'ラブラブリング', 'You’ll win her<br>heart with this!', 'ラブラブなパワーが<br>あふれ出ています', 0, 'accessory', 83, 'accessory', 145, 72, ["Peach"], {});
		else if (item == "Coin Trick")
			newItem = new Item(item, "Coin Trick", 'かがやけるひのために', 'Doubles the<br>coins you win<br>in battle', 'バトルでもらえるコイン<br>が、なんと倍になります', 0, 'accessory', 88, 'accessory', 36, 18, ["Mario"], {});
		else if (item == "Exp. Booster")
			newItem = new Item(item, "Exp. Booster", 'あなたをこえたくて', 'Doubles Exp.<br>when equipped', 'そうびしているとＥＸＰ<br>が倍もらえちゃいます', 0, 'accessory', 80, 'accessory', 22, 11, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {});
		else if (item == "Fearless Pin")
			newItem = new Item(item, "Fearless Pin", 'きょうふふせぎバッジ', 'Prevents Fear<br>attacks', 'きょうふこうげきを<br>ふせぎます', 0, 'accessory', 86, 'accessory', 130, 65, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 5, "mdef": 5});
		else if (item == "Feather")
			newItem = new Item(item, "Feather", 'ドドのはね', 'Speed up by 20', '「すばやさ」が<br>２０アップ！', 0, 'accessory', 91, 'accessory', null, 333, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 5, "mdef": 5});
		else if (item == "Ghost Medal")
			newItem = new Item(item, "Ghost Medal", 'ゆうれいくんしょう', 'Raises defense<br>while attacking', 'バトル中、ぼうぎょ力倍', 0, 'accessory', 89, 'accessory', null, 800, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {});
		else if (item == "Jinx Belt")
			newItem = new Item(item, "Jinx Belt", 'ジャッキーベルト', 'Jinx’s emblem<br>of power!', 'ジャッキーエンブレムが<br>キラリとかがやくベルト', 0, 'accessory', 90, 'accessory', null, 999, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"atk": 27, "def": 27});
		else if (item == "Jump Shoes")
			newItem = new Item(item, "Jump Shoes", 'かいてんシューズ', 'Use jump attacks<br>against any foe', 'ジャンプのきかない敵も<br>ＫＯです　（バトル中）', 0, 'accessory', 76, 'accessory', 30, 15, ["Mario"], {"def": 1, "matk": 5, "mdef": 1});
		else if (item == "Quartz Charm")
			newItem = new Item(item, "Quartz Charm", 'クリスタルのおまもり', 'Shining source<br>of power!', 'クリスタルのかがやきが<br>力をあたえてくれます', 0, 'accessory', 94, 'accessory', null, 3, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {});
		else if (item == "Rare Scarf")
			newItem = new Item(item, "Rare Scarf", 'ぼうぎょスカーフ', 'Raises defense<br>power!', 'ぼうぎょ力がアップ', 0, 'accessory', 82, 'accessory', null, 75, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 15, "mdef": 15});
		else if (item == "Safety Badge")
			newItem = new Item(item, "Safety Badge", 'あんしんバッジ', 'Raises defense<br>power!', 'ちんもくカカシきょうふ<br>キノコねむり毒をふせぐ', 0, 'accessory', 75, 'accessory', null, 250, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 5, "mdef": 5});
		else if (item == "Safety Ring")
			newItem = new Item(item, "Safety Ring", 'セーフティーリング', 'Raises defense<br>power!', 'いちげき死こうげきを<br>ふせぎます', 0, 'accessory', 77, 'accessory', null, 400, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 5, "mdef": 5});
		else if (item == "Scrooge Ring")
			newItem = new Item(item, "Scrooge Ring", 'きみがいてくれたから', 'Cuts FP use<br>in half<br>during battle', 'バトル中のしょうひＦＰ<br>が半分になります', 0, 'accessory', 79, 'accessory', 50, 25, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {});
		else if (item == "Signal Ring")
			newItem = new Item(item, "Signal Ring", 'おしらせリング', 'Noise indicates<br>a hidden chest.', 'かくし宝箱がある場所に<br>行くと、音がなります', 0, 'accessory', 93, 'accessory', null, 300, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {});
		else if (item == "Troopa Pin")
			newItem = new Item(item, "Troopa Pin", 'パタパタくんしょう', 'Grants “Troopa”<br>confidence!', 'これをつければ、キミの<br>パタパタ力がアップ！！', 0, 'accessory', 92, 'accessory', null, 500, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {});
		else if (item == "Trueform Pin")
			newItem = new Item(item, "Trueform Pin", 'へんしんふせぎバッジ', 'You won’t be<br>turned into<br>Mushrooms or<br>Scarecrows!', 'キノコ・カカシになる<br>こうげきをふせぎます', 0, 'accessory', 87, 'accessory', 60, 30, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 4, "mdef": 4});
		else if (item == "Wake Up Pin")
			newItem = new Item(item, "Wake Up Pin", 'ぼんやりふせぎバッジ', 'Prevents Mute &<br>Sleep attacks', 'ちんもく・ねむりの<br>こうげきをふせぎます', 0, 'accessory', 85, 'accessory', 42, 21, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 3, "mdef": 3});
		else if (item == "Zoom Shoes")
			newItem = new Item(item, "Zoom Shoes", 'シュビビンシューズ', 'Speed up by 10!', '「すばやさ」が<br>１０アップ！', 0, 'accessory', 74, 'accessory', null, 50, ["Mario", "Mallow", "Geno", "Bowser", "Peach"], {"def": 5, "mdef": 5});
		else if (item == "Able Juice")
			newItem = new Item(item, "Able Juice", 'リフレッシュジュース', 'Heals status<br>problems<br>during battle', 'バトル中のびょうきを<br>なおします', 0.25, 'heal', 103, 'unusable', 4, 2);
		else if (item == "Bad Mushroom")
			newItem = new Item(item, "Bad Mushroom", 'どくキノコ', 'Poisons<br>an enemy', '敵単体に毒のこうげき', 0.25, 'heal', 112, 'unusable', 30, 15);
		else if (item == "Bracer")
			newItem = new Item(item, "Bracer", 'カタクナール', 'Raises ally’s<br>def. in battle', 'バッル中、味方１人の<br>ぼうぎょ力を上げます', 0.15, 'heal', 104, 'unusable', 2, 1);
		else if (item == "Bright Card")
			newItem = new Item(item, "Bright Card", 'ブリリアントカード', 'A member’s card<br>for the casino', 'カジノに入るための<br>メンバーズカードです', 0, 'none', 174, 'unusable', null, 777);
		else if (item == "Carbo Cookie")
			newItem = new Item(item, "Carbo Cookie", 'カルボクッキー', 'Kid’s love ’em', '子どもに人気のおいしい<br>クッキーです', 0, 'none', 137, 'unusable', null, 1);
		else if (item == "Crystalline")
			newItem = new Item(item, "Crystalline", 'ミンナカタクナール', 'Raises party’s<br>Defense in<br>battle', 'バッル中、味方全員の<br>ぼうぎょ力を上げます', 0.15, 'heal', 153, 'unusable', 5, 2);
		else if (item == "EarlierTimes")
			newItem = new Item(item, "EarlierTimes", 'あのころにもどりたい', 'Use it to start<br>a battle over', '使うと、そのバトルを<br>始めからやりなおせます', 0, 'question', 126, 'unusable', 15, 7);
		else if (item == "Elixir")
			newItem = new Item(item, "Elixir", 'あしはえドリンク', 'Party recovers<br>80 HP', '全員のＨＰを<br>８０回復します', 0.25, 'heal', 121, 'usable', 48, 24);
		else if (item == "Energizer")
			newItem = new Item(item, "Energizer", 'ツヨクナール', 'Raises ally’s<br>battle power<br>during battle', 'バッル中、味方１人の<br>こうげき力を上げます', 0.15, 'heal', 121, 'unusable', 2, 1);
		else if (item == "Fertilizer")
			newItem = new Item(item, "Fertilizer", 'ひりょう', 'Nutrients!', 'よくそだつ水です', 0, 'none', 159, 'unusable', null, 100);
		else if (item == "Fire Bomb")
			newItem = new Item(item, "Fire Bomb", 'かえんだま', 'Hit all<br>enemies w/fire', '敵全体に火のこうげき', 0.25, 'bomb', 113, 'unusable', 200, 100);
		else if (item == "Fireworks")
			newItem = new Item(item, "Fireworks", 'はなび', 'A gorgeous<br>firework', 'きれいな花火の玉です', 0, 'none', 172, 'unusable', 500, 250);
		else if (item == "Flower Box")
			newItem = new Item(item, "Flower Box", 'フラワーギフト', 'Raises Flower<br>Pts. by 5', 'ＦＰのＭＡＸを<br>５増やします', 0, 'none', 117, 'usable', null, 500);
		else if (item == "Flower Jar")
			newItem = new Item(item, "Flower Jar", 'フラワーセット', 'Raises Flower<br>Pts. by 3', 'ＦＰのＭＡＸを<br>３増やします', 0, 'none', 116, 'usable', null, 300);
		else if (item == "Flower Tab")
			newItem = new Item(item, "Flower Tab", 'フラワーカプセル', 'Raises Flower<br>Pts. by 1', 'ＦＰのＭＡＸを<br>１増やします', 0, 'none', 115, 'usable', null, 100);
		else if (item == "Freshen Up")
			newItem = new Item(item, "Freshen Up", 'リフレッシュオール', 'Party is<br>refreshed<br>during battle', 'バトル中、全員を<br>リフレッシュします', 0.25, 'heal', 127, 'unusable', 50, 25);
		else if (item == "Fright Bomb")
			newItem = new Item(item, "Fright Bomb", 'びびりだま', 'Fear Attack on<br>all enemies', '敵単体に<br>「きょうふ」こうげき', 0.25, 'bomb', 144, 'unusable', 100, 50);
		else if (item == "FroggieDrink")
			newItem = new Item(item, "FroggieDrink", 'オタマドリンク', 'Party recovers<br>30 HP', '全員のＨＰを<br>３０回復します', 0.25, 'heal', 119, 'usable', 16, 8);
		else if (item == "Goodie Bag")
			newItem = new Item(item, "Goodie Bag", 'ふくぶくろ', 'It’s packed<br>full of coins', 'コインがぎっしりと<br>つまっています', 0, 'question', 125, 'unusable', null, 555);
		else if (item == "Honey Syrup")
			newItem = new Item(item, "Honey Syrup", 'ハニーシロップ', 'Recovers 10<br>Flower Pts.', 'ＦＰを１０回復します', 0.25, 'heal', 99, 'unusable', 10, 5);
		else if (item == "Ice Bomb")
			newItem = new Item(item, "Ice Bomb", 'こおりだま', 'Hit all<br>enemies w/ice', '敵全体に水のこうげき', 0.25, 'bomb', 114, 'unusable', 250, 125);
		else if (item == "KerokeroCola")
			newItem = new Item(item, "KerokeroCola", 'ケロケロドリンク', 'All members<br>recover fully', '全員を全回復させます', 0.25, 'heal', 108, 'usable', 400, 200);
		else if (item == "Lamb's Lure")
			newItem = new Item(item, "Lamb's Lure", 'ひつじのゆうわく', 'Baa, baa...', 'めえめめえめ　めえめえ<br>めめえ', 0, 'question', 143, 'unusable', null, 2);
		else if (item == "Lucky Jewel")
			newItem = new Item(item, "Lucky Jewel", 'ラッキージュエル', 'Summons Luck<br>at will', '好きな時にラッキーが<br>出せます', 0, 'question', 148, 'unusable', 200, 100);
		else if (item == "Maple Syrup")
			newItem = new Item(item, "Maple Syrup", 'メイプルシロップ', 'Recovers 40<br>Flower Pts.', 'ＦＰを4０回復します', 0.25, 'heal', 100, 'usable', 30, 15);
		else if (item == "Max Mushroom")
			newItem = new Item(item, "Max Mushroom", 'ウルトラキノコ', 'Recovers all HP', 'ＨＰを全回復します', 0.25, 'heal', 98, 'usable', 78, 39);
		else if (item == "Megalixir")
			newItem = new Item(item, "Megalixir", 'おヒレちぢみドリンク', 'Party recovers<br>150 HP', '全員のＨＰを<br>１５０回復します', 0.25, 'heal', 122, 'usable', 120, 60);
		else if (item == "Mid Mushroom")
			newItem = new Item(item, "Mid Mushroom", 'スーパーキノコ', 'Recovers 80 HP', 'ＨＰを８０回復します', 0.25, 'heal', 97, 'usable', 20, 10);
		else if (item == "Moldy Mush")
			newItem = new Item(item, "Moldy Mush", 'カビはえキノコ', 'Gross!<br>There’s mold<br>growing on it!', 'カビがはえています‥', 0.25, 'heal', 157, 'usable', null, 1);
		else if (item == "Muku Cookie")
			newItem = new Item(item, "Muku Cookie", 'ムクムクのクッキー', 'Muku! Muku-<br>muku! Muka?', 'ぬほ　むくく　むくむく<br>むくむくく　むふ～', 0.25, 'dot', 120, 'usable', 69, 34);
		else if (item == "Mushroom")
			newItem = new Item(item, "Mushroom", 'キノコ', 'Recovers 30 HP', 'ＨＰを３０回復します', 0.25, 'heal', 96, 'usable', 4, 2);
		else if (item == "Mushroom 2")
			newItem = new Item(item, "Mushroom", 'キノコ', 'Recoers 30 HP,<br>but...', 'ＨＰを３０回復します<br>だけど‥', 0.25, 'heal', 175, 'usable', 4, 2);
		else if (item == "Mystery Egg")
			newItem = new Item(item, "Mystery Egg", 'ふしぎなたまご', 'Recoers 30 HP,<br>but...', 'あなたの愛で育ててね♥<br>愛すなわち『ラブ』ね♥', 0, 'question', 145, 'unusable', 200, 100);
		else if (item == "Pick Me Up")
			newItem = new Item(item, "Pick Me Up", 'ふっかつドリンク', 'Revives downed<br>allies', '倒れている仲間を<br>よみがえらせます', 0.25, 'heal', 102, 'unusable', 5, 2);
		else if (item == "Power Blast")
			newItem = new Item(item, "Power Blast", 'ミンナツヨクナール', 'Raises party’s<br>Attack Power<br>in battle', 'バッル中、味方全員の<br>こうげき力を上げます', 0.15, 'heal', 154, 'unusable', 5, 2);
		else if (item == "Pure Water")
			newItem = new Item(item, "Pure Water", 'せいすい', 'Defeats ghosts<br>in a wink', 'ゆうれいをイチコロで<br>たおせます', 0.25, 'bomb', 110, 'unusable', 150, 75);
		else if (item == "Red Essence")
			newItem = new Item(item, "Red Essence", 'レッドヨッシーエキス', 'You won’t be<br>attacked for<br>3 turns<br>during battle', 'バトル中、３ターンだけ<br>むてきになれます', 0.15, 'heal', 107, 'unusable', null, 200);
		else if (item == "Rock Candy")
			newItem = new Item(item, "Rock Candy", 'こんぺいとう', 'Attack all<br>enemies', '敵全体にこうげき', 0.15, 'bomb', 131, 'unusable', null, 200);
		else if (item == "Rotten Mush")
			newItem = new Item(item, "Rotten Mush", 'くさったキノコ', 'Eeew,<br>it’s rotten!', 'くさってます‥', 0.25, 'heal', 156, 'usable', null, 2);
		else if (item == "Royal Syrup")
			newItem = new Item(item, "Royal Syrup", 'ロイヤルシロップ', 'Recovers all<br>Flower Pts.', 'ＦＰを全回復します', 0.25, 'heal', 101, 'usable', null, 50);
		else if (item == "Seed")
			newItem = new Item(item, "Seed", 'たね', 'A fast-growing<br>seed', 'よくそだつたねです', 0, 'none', 158, 'unusable', null, 150);
		else if (item == "See Ya")
			newItem = new Item(item, "See Ya", 'たね', 'Allows you to<br>run away from<br>battles', '「にげる」が必ず成功<br>使ってもなくなりません', 0, 'question', 123, 'unusable', 10, 5);
		else if (item == "Sheep Attack")
			newItem = new Item(item, "Sheep Attack", 'ひつじのしょうどう', 'Baah, baah...', 'めえめめえめ　めえめめ<br>めえめえ', 0, 'question', 136, 'unusable', null, 1);
		else if (item == "Shiny Stone")
			newItem = new Item(item, "Shiny Stone", 'ぴかぴかいし', 'Baah, baah...', 'きれいな石です', 0, 'none', 138, 'unusable', null, 2);
		else if (item == "Sleepy Bomb")
			newItem = new Item(item, "Sleepy Bomb", 'ねむりだま', 'Puts enemies<br>to sleep', '敵全体をねむらせます', 0.25, 'bomb', 111, 'unusable', 1, 1);
		else if (item == "Star Egg")
			newItem = new Item(item, "Star Egg", 'スターのたまご', 'Reusable battle<br>item', '何度でも使えるこうげき<br>アイテム‥', 0, 'bomb', 176, 'unusable', null, 1);
		else if (item == "Wallet")
			newItem = new Item(item, "Wallet", 'サイフ', 'A fat wallet', 'かなり入ってるサイフだ', 0, 'none', 129, 'unusable', null, 123);
		else if (item == "Wilt Shroom")
			newItem = new Item(item, "Wilt Shroom", 'しなびたキノコ', 'It’s wilted...', 'しなびてます‥', 0.25, 'heal', 155, 'usable', null, 4);
		else if (item == "Yoshi-Ade")
			newItem = new Item(item, "Yoshi-Ade", 'ヨシクナール', 'Power raised<br>during battle', 'バトル中、味方１人の<br>こうげき力を上げます', 0.15, 'heal', 106, 'unusable', null, 100);
		else if (item == "Yoshi Candy")
			newItem = new Item(item, "Yoshi Candy", 'ヨッシーキャンディー', 'Recovers 100 HP', 'ＨＰを１００回復します', 0.25, 'dot', 118, 'usable', null, 70);
		else if (item == "Yoshi Cookie")
			newItem = new Item(item, "Yoshi Cookie", 'ヨッシーのクッキー', 'Summons Yoshi<br>during battle', 'バトル中、ヨッシーを<br>よびだします', 0.15, 'dot', 109, 'unusable', null, 1);
		if (this.length < 29) {
			if (buy === true && $scope.coins >= newItem.buy) {
				$scope.coins -= newItem.buy;
				this.push(newItem);
			}
			else if (buy == "frog") {
				$scope.frogcoins -= newItem.buy;
				this.push(newItem);
			}
			else if (buy !== true && buy !== 'frog')
				this.push(newItem);
		}
	}
	
	setShopMenu = function(id) {
		$scope.shopMenu = [];
		if (id == 0) {
			$scope.shopMenu.addItem("Mushroom");
			$scope.shopMenu.addItem("Honey Syrup");
			$scope.shopMenu.addItem("Pick Me Up");
			$scope.shopMenu.addItem("Able Juice");
			$scope.shopMenu.addItem("Shirt");
			$scope.shopMenu.addItem("Pants");
			$scope.shopMenu.addItem("Jump Shoes");
			$scope.shopMenu.addItem("Antidote Pin");
		}
		else if (id == 1) {
			$scope.shopMenu.addItem("FroggieDrink");
		}
		else if (id == 2) {
			$scope.shopMenu.addItem("Sleepy Bomb");
			$scope.shopMenu.addItem("Bracer");
			$scope.shopMenu.addItem("Energizer");
			$scope.shopMenu.addItem("Crystalline");
			$scope.shopMenu.addItem("Power Blast");
		}
		else if (id == 3) {
			$scope.shopMenu.addItem("Thick Shirt");
			$scope.shopMenu.addItem("Thick Pants");
			$scope.shopMenu.addItem("Jump Shoes");
			$scope.shopMenu.addItem("Antidote Pin");
			$scope.shopMenu.addItem("Wake Up Pin");
			$scope.shopMenu.addItem("Trueform Pin");
			$scope.shopMenu.addItem("Fearless Pin");
		}
		else if (id == 4) {
			$scope.shopMenu.addItem("Punch Glove");
			$scope.shopMenu.addItem("Finger Shot");
			$scope.shopMenu.addItem("Cymbals");
			$scope.shopMenu.addItem("Mega Shirt");
			$scope.shopMenu.addItem("Mega Cape");
			$scope.shopMenu.addItem("Mega Pants");
			$scope.shopMenu.addItem("Work Pants");
			$scope.shopMenu.addItem("Mid Mushroom");
			$scope.shopMenu.addItem("Maple Syrup");
		}
		else if (id == 6) {
			$scope.shopMenu.addItem("See Ya");
			$scope.shopMenu.addItem("EarlierTimes");
			$scope.shopMenu.addItem("Exp. Booster");
			$scope.shopMenu.addItem("Coin Trick");
			$scope.shopMenu.addItem("Scrooge Ring");
		}
		else if (id == 7) {
			$scope.shopMenu.addItem("Bad Mushroom");
			$scope.shopMenu.addItem("Muku Cookie");
			$scope.shopMenu.addItem("Fright Bomb");
			$scope.shopMenu.addItem("Fire Bomb");
			$scope.shopMenu.addItem("Ice Bomb");
		}
		else if (id == 13) {
			$scope.shopMenu.addItem("Troopa Shell");
			$scope.shopMenu.addItem("Parasol");
			$scope.shopMenu.addItem("Hurly Gloves");
			$scope.shopMenu.addItem("Double Punch");
			$scope.shopMenu.addItem("Ribbit Stick");
			$scope.shopMenu.addItem("NokNok Shell");
			$scope.shopMenu.addItem("Punch Glove");
			$scope.shopMenu.addItem("Finger Shot");
			$scope.shopMenu.addItem("Cymbals");
			$scope.shopMenu.addItem("Chomp Shell");
			$scope.shopMenu.addItem("Super Hammer");
			$scope.shopMenu.addItem("Hand Gun");
			$scope.shopMenu.addItem("Whomp Glove");
			$scope.shopMenu.addItem("Slap Glove");
			$scope.shopMenu.addItem("Lucky Hammer");
		}
		else if (id == 15) {
			$scope.shopMenu.addItem("Mid Mushroom");
			$scope.shopMenu.addItem("Maple Syrup");
			$scope.shopMenu.addItem("Pick Me Up");
			$scope.shopMenu.addItem("Able Juice");
			$scope.shopMenu.addItem("Freshen Up");
			$scope.shopMenu.addItem("Mega Glove");
			$scope.shopMenu.addItem("War Fan");
			$scope.shopMenu.addItem("Hand Cannon");
			$scope.shopMenu.addItem("Sticky Glove");
			$scope.shopMenu.addItem("Fuzzy Shirt");
			$scope.shopMenu.addItem("Fuzzy Pants");
			$scope.shopMenu.addItem("Fuzzy Cape");
			$scope.shopMenu.addItem("Fuzzy Dress");
		}
	}
	
	doMenu = function(id) {
		if (id == 0) { //MK Menu
			$scope.items.useItem($scope.items.getIndex("Mushroom"), true);
			$scope.items.useItem($scope.items.getIndex("Flower Jar"), true);
			for (var i = 0; i < 5; i++)
				$scope.items.addItem('Honey Syrup', true);
			for (var i = 0; i < 4; i++)
				$scope.items.addItem('Pick Me Up', true);
			for (var i = 0; i < 4; i++)
				$scope.items.addItem('Able Juice', true);
			$scope.equips.addItem('Shirt', true);
			$scope.equips.addItem('Jump Shoes', true);
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "weapon"}, {"parent": "free", "index": $scope.equips.getIndex("Hammer")});
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": "free", "index": $scope.equips.getIndex("Shirt")});
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Jump Shoes")});
		}
		else if (id == 1) { //Tadpole right
			$scope.items.addItem("FroggieDrink", true);
			$scope.items.addItem("FroggieDrink", true);
		}
		else if (id == 2) { //Tadpole left
			$scope.items.addItem("Sleepy Bomb", "frog");
			$scope.items.addItem("Sleepy Bomb", "frog");
			$scope.items.addItem("Energizer", "frog");
		}
		else if (id == 3) { //Rose Town Menu
			$scope.equips.addItem("Wake Up Pin", true);
			$scope.equips.addItem("Wake Up Pin", true);
		}
		else if (id == 4) { //Moleville
			$scope.equips.addItem("Punch Glove", true);
			$scope.equips.addItem("Finger Shot", true);
			$scope.equips.addItem("Cymbals", true);
			for (var i = 0; i < 4; i++)
				$scope.equips.addItem("Work Pants", true);
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Punch Glove")}, {"parent": $scope.party.getIndex("Mario"), "index": "weapon"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Work Pants")}, {"parent": $scope.party.getIndex("Mario"), "index": "armor"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Cymbals")}, {"parent": $scope.party.getIndex("Mallow"), "index": "weapon"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Work Pants")}, {"parent": $scope.party.getIndex("Mallow"), "index": "armor"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Finger Shot")}, {"parent": $scope.party.getIndex("Geno"), "index": "weapon"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Work Pants")}, {"parent": $scope.party.getIndex("Geno"), "index": "armor"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Wake Up Pin")}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
		}
		else if (id == 5) { //Booster's Tower
			partySwap($scope.party.getIndex("Bowser"), $scope.party.getIndex("Mallow"));
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Amulet")}, {"parent":  $scope.party.getIndex("Mario"), "index": "accessory"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Work Pants")}, {"parent":  $scope.party.getIndex("Bowser"), "index": "armor"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Wake Up Pin")}, {"parent":  $scope.party.getIndex("Bowser"), "index": "accessory"});
		}
		else if (id == 6) { //Seaside 1
			$scope.equips.addItem("Exp. Booster", "frog");
		}
		else if (id == 7) { //Seaside 2
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Exp. Booster")});
			equipSwap({"parent": $scope.party.getIndex("Bowser"), "index": "accessory"}, {"parent": "free", "index": null});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "weapon"}, {"parent": "free", "index": null});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Amulet")});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "weapon"}, {"parent": "free", "index": null});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "armor"}, {"parent": $scope.party.getIndex("Mallow"), "index": "armor"});
			equipSwap({"parent": $scope.party.getIndex("Mallow"), "index": "weapon"}, {"parent": "free", "index": null});
			var index = 0;
			while (index >= 0) {
				var index = $scope.items.getIndex("Mushroom");
				if (index >= 0) {
					$scope.items.useItem(index, true);
				}
			}
			var index = 0;
			while (index >= 0) {
				var index = $scope.items.getIndex("Honey Syrup");
				if (index >= 0) {
					$scope.items.useItem(index, true);
				}
			}
			var index = 0;
			while (index >= 0) {
				var index = $scope.items.getIndex("Pick Me Up");
				if (index >= 0) {
					$scope.items.useItem(index, true);
				}
			}
			var index = 0;
			while (index >= 0) {
				var index = $scope.items.getIndex("Able Juice");
				if (index >= 0) {
					$scope.items.useItem(index, true);
				}
			}
			var index = 0;
			while (index >= 0) {
				var index = $scope.items.getIndex("Energizer");
				if (index >= 0) {
					$scope.items.useItem(index, true);
				}
			}
			var x = $scope.items.filter(function(o) {
				return o.id == "FroggieDrink";
			})
			if (x.length > 1)
				$scope.items.useItem($scope.items.getIndex("FroggieDrink"), true);
			for (var i = 0; i < 3; i++)
				$scope.items.useItem($scope.items.getIndex("KerokeroCola"), true);
			$scope.items.addItem("Bad Mushroom", true);
			$scope.items.addItem("Fright Bomb", true);
			for (var i = 0; i < 3; i++)
				$scope.items.addItem("Ice Bomb", true);
			$scope.items.useItem($scope.items.getIndex("KerokeroCola"), true);
			$scope.items.useItem($scope.items.getIndex("Goodie Bag"), true);
			$scope.items.useItem($scope.items.getIndex("Wallet"), true);
			$scope.items.addItem("Ice Bomb", true);
			$scope.items.addItem("Ice Bomb", true);
			$scope.items.addItem("Fire Bomb", true);
			$scope.items.addItem("Fire Bomb", true);
			$scope.items.useItem($scope.items.getIndex("Flower Tab"), true);
			$scope.items.useItem($scope.items.getIndex("Flower Jar"), true);
			$scope.items.useItem($scope.items.getIndex("Flower Box"), true);
			for (var i = 0; i < 3; i++)
				$scope.items.addItem("Fire Bomb", true);
			$scope.items.addItem("Ice Bomb", true);
			$scope.items.useItem($scope.items.getIndex("Flower Tab"), true);
			$scope.items.useItem($scope.items.getIndex("Flower Jar"), true);
			while ($scope.equips.length > 0)
				$scope.equips.useItem(0, true);
			$scope.items.addItem("Fire Bomb", true);
			$scope.items.addItem("Fire Bomb", true);
			$scope.items.addItem("Ice Bomb", true);
			$scope.items.addItem("Ice Bomb", true);
			var x = $scope.items.filter(function(o) {
				return o.id == "Fire Bomb";
			})
			var y = $scope.items.filter(function(o) {
				return o.id == "Ice Bomb";
			})
			if (y.length < 8 && 250 - $scope.coins <= 18) {
				equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "weapon"}, {"parent": "free", "index": null});
				$scope.equips.useItem($scope.equips.getIndex("Punch Glove"), true);
				$scope.items.addItem("Ice Bomb", true);
			}
			else if (x.length < 7 && 200 - $scope.coins <= 18) {
				equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "weapon"}, {"parent": "free", "index": null});
				$scope.equips.useItem($scope.equips.getIndex("Punch Glove"), true);
				$scope.items.addItem("Fire Bomb", true);
			}
			var x = $scope.items.filter(function(o) {
				return o.id == "Fire Bomb";
			})
			var y = $scope.items.filter(function(o) {
				return o.id == "Ice Bomb";
			})
			if ($scope.items.getIndex("Flower Box") >= 0) {
				$scope.items.useItem($scope.items.getIndex("Flower Box"), true);
				if (x.length < 7)
					$scope.items.addItem("Fire Bomb", true);
				$scope.items.addItem("Ice Bomb", true);
				$scope.items.addItem("Ice Bomb", true);
			}
			if ($scope.items.getIndex("Red Essence") >= 0) {
				if (y.length < 8)
					$scope.items.addItem("Ice Bomb", true);
				$scope.items.useItem($scope.items.getIndex("Red Essence"), true);
				$scope.items.addItem("Fire Bomb", true);
			}
			if ($scope.coins >= 250) {
				$scope.items.addItem("Ice Bomb", true);
			}
			if ($scope.coins >= 200) {
				$scope.items.addItem("Fire Bomb", true);
			}
			if ($scope.coins >= 30) {
				$scope.items.addItem("Bad Mushroom", true);
			}
		}
		else if (id == 8) { //Sea
			partySwap($scope.party.getIndex("Peach"), $scope.party.getIndex("Mallow"));
		}
		else if (id == 9) { // Sea 2
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": $scope.party.getIndex("Peach"), "index": "accessory"});
		}
		else if (id == 10) { // Sunken Ship 1
			partySwap($scope.party.getIndex("Peach"), $scope.party.getIndex("Bowser"));
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": $scope.party.getIndex("Peach"), "index": "accessory"});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "accessory"}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
			equipSwap({"parent": "free", "index": $scope.equips.getIndex("Safety Ring")}, {"parent": $scope.party.getIndex("Peach"), "index": "accessory"});
		}
		else if (id == 11) { // Sunken Ship 2
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
		}
		else if (id == 12) { // Sunken Ship 3
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": $scope.party.getIndex("Peach"), "index": "accessory"});
		}
		else if (id == 13) { // Seaside 2
			$scope.equips.addItem("Troopa Shell", true);
			$scope.equips.addItem("Double Punch", true);
			$scope.equips.addItem("Hurly Gloves", true);
			var index = 0;
			while (index >= 0) {
				var index = $scope.items.getIndex("Mushroom");
				if (index >= 0) {
					$scope.items.useItem(index, true);
				}
			}
			var index = 0;
			while (index >= 0) {
				var index = $scope.items.getIndex("FroggieDrink");
				if (index >= 0) {
					$scope.items.useItem(index, true);
				}
			}
			$scope.items.useItem($scope.items.getIndex("Flower Box"), true);
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "weapon"}, {"parent": "free", "index": $scope.equips.getIndex("Troopa Shell")});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "weapon"}, {"parent": "free", "index": $scope.equips.getIndex("Double Punch")});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": $scope.party.getIndex("Peach"), "index": "accessory"});
		}
		else if (id == 14) { // Land's End
			partySwap($scope.party.getIndex("Peach"), $scope.party.getIndex("Bowser"));
			equipSwap({"parent": $scope.party.getIndex("Bowser"), "index": "weapon"}, {"parent": "free", "index": $scope.equips.getIndex("Hurly Gloves")});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "armor"}, {"parent": "free", "index": $scope.equips.getIndex("Super Suit")});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Troopa Pin")});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "accessory"}, {"parent": $scope.party.getIndex("Bowser"), "index": "accessory"});
		}
		else if (id == 15) { // Nimbus Land
			if ($scope.equips.getIndex("Punch Glove") != -1) {
				$scope.equips.useItem($scope.equips.getIndex("Punch Glove"), true);
			}
			$scope.equips.useItem($scope.equips.getIndex("Work Pants"), true);
			$scope.equips.useItem($scope.equips.getIndex("Amulet"), true);
			$scope.items.addItem("Mid Mushroom", true);
			$scope.items.addItem("Mid Mushroom", true);
			$scope.items.addItem("Maple Syrup", true);
			$scope.items.addItem("Maple Syrup", true);
			if ($scope.items.getIndex("Pick Me Up") == -1) {
				$scope.items.addItem("Pick Me Up", true);
			}
			$scope.equips.addItem("Mega Glove", true);
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "weapon"}, {"parent": "free", "index": $scope.equips.getIndex("Mega Glove")});
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Attack Scarf")});
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Geno"), "index": "armor"});
			equipSwap({"parent": $scope.party.getIndex("Bowser"), "index": "accessory"}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Exp. Booster")});
		}
		else if (id == 16) { //Barrel Volcano 1
			partySwap($scope.party.getIndex("Geno"), $scope.party.getIndex("Peach"));
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": $scope.party.getIndex("Peach"), "index": "accessory"});
			var x = $scope.items.filter(function(o) {
				return o.id == "Ice Bomb";
			});
			if (x.length < 4)
				equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Peach"), "index": "armor"});
		}
		else if (id == 17) { //Barrel Volcano 2
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Attack Scarf")});
			if ($scope.party[$scope.party.getIndex("Peach")].equips.armor.id == "Super Suit") {
				equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Peach"), "index": "armor"});
				$scope.items.useItem($scope.items.getIndex("Maple Syrup"));
			}
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Exp. Booster")});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Feather")});
			partySwap($scope.party.getIndex("Geno"), $scope.party.getIndex("Peach"));
		}
		else if (id == 18) { //Barrel Volcano 3
			equipSwap({"parent": $scope.party.getIndex("Bowser"), "index": "weapon"}, {"parent": "free", "index": null});
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Bowser"), "index": "armor"});
		}
		else if (id == 19) { //Pre-Magikoopa
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Bowser"), "index": "armor"});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": $scope.party.getIndex("Bowser"), "index": "accessory"});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "weapon"}, {"parent": "free", "index": $scope.equips.getIndex("Super Slap")});
			partySwap($scope.party.getIndex("Bowser"), $scope.party.getIndex("Peach"));
		}
		else if (id == 20) { //Pre-Countdown
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "weapon"}, {"parent": "free", "index": $scope.equips.getIndex("Ultra Hammer")});
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Peach"), "index": "armor"});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "accessory"}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
			equipSwap({"parent": $scope.party.getIndex("Geno"), "index": "accessory"}, {"parent": "free", "index": $scope.equips.getIndex("Safety Ring")});
		}
		else if (id == 21) { //Post-Countdown
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Peach"), "index": "armor"});
		}
		else if (id == 22) {
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Peach"), "index": "armor"});
		}
		else if (id == 23) {
			equipSwap({"parent": $scope.party.getIndex("Mario"), "index": "armor"}, {"parent": $scope.party.getIndex("Peach"), "index": "armor"});
			equipSwap({"parent": $scope.party.getIndex("Peach"), "index": "accessory"}, {"parent": $scope.party.getIndex("Geno"), "index": "accessory"});
		}
	}
	preMenu = function(id) {
		if (id == 0) { //MK Menu
			//Mario's Pad
			$scope.party.push(new Character("Mario", "Mario", "マリオ", 1, 20, 0, 10, 2, 20));
			for (var i = 0; i < 4; i++)
				$scope.items.addItem('Mushroom');
			//Mushroom Way
			$scope.totalFlowers++;
			$scope.coins += 20;
			$scope.items.addItem('Flower Jar')
			$scope.equips.addItem('Hammer');
		}
		else if (id == 1) { //Tadpole right
			//Mushroom Kingdom
			$scope.frogcoins++;
			$scope.party.push(new Character("Mallow", "Mallow", "マロ", 2, 22, 3, 15, 10, 20));
			//Bandit's Way
			$scope.items.addItem("KerokeroCola");
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 2;
			$scope.party[pid].currenthp = 25;
			$scope.party[pid].totalhp = 25;
			$scope.party[pid].atk = 23;
			$scope.party[pid].def = 2;
			$scope.party[pid].matk = 15;
			$scope.party[pid].mdef = 5;
			var flower = Math.random();
			$scope.totalFlowers++;
			$scope.items.useItem($scope.items.getIndex("Honey Syrup"), "battle");
			$scope.items.useItem($scope.items.getIndex("Honey Syrup"), "battle");
			var pmu = Math.random();
			if (pmu < 0.25)
				$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
			if (pmu < 0.5)
				$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
			$scope.coins+= 10;
			$scope.items.addItem("Flower Tab");
			$scope.items.addItem("Wallet");
			//Kero Sewers
			$scope.currentFlowers = $scope.totalFlowers;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 3;
			$scope.party[pid].currenthp = 24;
			$scope.party[pid].totalhp = 24;
			$scope.party[pid].atk = 24;
			$scope.party[pid].def = 6;
			$scope.party[pid].matk = 18;
			$scope.party[pid].mdef = 13;
			var pmu = Math.random();
			if (pmu < 0.1) {
				$scope.items.useItem($scope.items.getIndex("Able Juice"), "battle");
			}
			else if (pmu < 0.25) {
				$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
			}
			$scope.items.useItem($scope.items.getIndex("Honey Syrup"), "battle");
			var ss = Math.random();
			if (ss < 1 / 6) {
				$scope.items.useItem($scope.items.getIndex("Able Juice"), "battle");
			}
			$scope.items.useItem($scope.items.getIndex("Honey Syrup"), "battle");
			$scope.coins += 30;
			$scope.items.addItem("Flower Jar");
			$scope.equips.addItem("Trueform Pin");
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 3;
			$scope.party[pid].currenthp = 30;
			$scope.party[pid].totalhp = 30;
			$scope.party[pid].atk = 26;
			$scope.party[pid].def = 4;
			$scope.party[pid].matk = 18;
			$scope.party[pid].mdef = 8;
			$scope.coins += 40;
			$scope.currentFlowers = $scope.totalFlowers;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 4;
			$scope.party[pid].currenthp = 28;
			$scope.party[pid].totalhp = 28;
			$scope.party[pid].atk = 27;
			$scope.party[pid].def = 10;
			$scope.party[pid].matk = 20;
			$scope.party[pid].mdef = 15;
			//Midas River
			$scope.frogcoins += 5;
			$scope.equips.addItem("NokNok Shell");
		}
		else if (id == 2) { //Tadpole left
			//Tadpole Pond
		}
		else if (id == 3) { //Rose Town Menu
			//Rose Way
			var missedCoin = Math.random();
			if (missedCoin < 0.2)
				$scope.coins += 5;
			else 
				$scope.coins += 13;
			$scope.coins += 10;
			//Rose Town
			$scope.totalFlowers++;
			$scope.frogcoins++;
		}
		else if (id == 4) { //Moleville
			$scope.totalFlowers += 2;
			$scope.frogcoins++;
			//Forest Maze
			$scope.items.addItem("KerokeroCola");
			$scope.coins += 63;
			var missedWiggler = Math.random();
			if (missedWiggler < 0.4)
				$scope.coins += Math.round(Math.random() * 10); //missed wigglers
			$scope.frogcoins+= 7;
			$scope.frogcoins++;
			$scope.items.addItem("KerokeroCola");
			$scope.items.addItem("Red Essence");
			$scope.party.push(new Character("Geno", "Geno", "ジーノ", 6, 60, 23, 25, 17, 45));
			$scope.items.useItem($scope.items.getIndex("Energizer"), "battle");
			var fd = Math.random();
			if (fd < 0.70) {
				$scope.items.useItem($scope.items.getIndex("FroggieDrink"), "battle");
			}
			else if (fd < 0.80) {
				$scope.items.useItem($scope.items.getIndex("Mushroom"), "battle");
			}
			$scope.items.useItem($scope.items.getIndex("Honey Syrup"), "battle");
			var mg = Math.random();
			if (mg < 0.4) {
				$scope.items.useItem($scope.items.getIndex("Mushroom"), "battle");
			}
			$scope.coins += 50;
			$scope.items.addItem("Flower Box");
		}
		else if (id == 5) { //Booster's Tower
			//Moleville
			if ($scope.items.getIndex("Energizer") != -1) {
				$scope.items.useItem($scope.items.getIndex("Energizer"), "battle");
			}
			else {
				var turn1bomb = Math.random();
				if (turn1bomb < 0.5 * (2 / 3)) {
					$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
				}
				if (turn1bomb < 0.5 * (1 / 3)) {
					var turn2bomb = Math.random();
					if (turn2bomb < 0.5 * (1 / 3)) {
						$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
					}
				}
			}
			var boxDrop = Math.random();
			if (boxDrop < 0.25) {
				$scope.items.addItem("Flower Box");
			}
			$scope.coins += 50;
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 5;
			$scope.party[pid].currenthp = 40;
			$scope.party[pid].totalhp = 40;
			$scope.party[pid].atk = 32;
			$scope.party[pid].def = 10;
			$scope.party[pid].matk = 26;
			$scope.party[pid].mdef = 14;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 5;
			$scope.party[pid].currenthp = 32;
			$scope.party[pid].totalhp = 32;
			$scope.party[pid].atk = 30;
			$scope.party[pid].def = 14;
			$scope.party[pid].matk = 23;
			$scope.party[pid].mdef = 17;
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 7;
			$scope.party[pid].currenthp = 59;
			$scope.party[pid].totalhp = 59;
			$scope.party[pid].atk = 65;
			$scope.party[pid].def = 26;
			$scope.party[pid].matk = 29;
			$scope.party[pid].mdef = 19;
			$scope.coins += 150;
			$scope.totalFlowers++;
			if ($scope.items.getIndex("Energizer") != -1) {
				$scope.items.useItem($scope.items.getIndex("Energizer"), "battle");
			}
			var sandstorm = Math.random();
			if (sandstorm < 0.5) {
				for (var i = 0; i < 3; i++) {
					if ($scope.items.getIndex("Able Juice") != -1) {
						$scope.items.useItem($scope.items.getIndex("Able Juice"), "battle");
					}
				}
			}
			//Minecart
			var room1Cart = Math.random();
			$scope.coins += 17;
			if (room1Cart < 50)
				$scope.coins += 2;
			var room2Cart = Math.random();
			$scope.coins += 6 + Math.round(Math.random() * 6);
			//Booster Pass
			$scope.frogcoins++;
			$scope.items.addItem("Rock Candy");
			//Booster Tower
			$scope.party.push(new Character("Bowser", "Bowser", "クッパ", 8, 85, 52, 20, 30, 80));
			$scope.items.addItem("Flower Tab");
			$scope.frogcoins += 8;
			var zs = Math.random();
			if (zs < 0.1) {
				$scope.equips.addItem("Zoom Shoes");
			}
			$scope.items.addItem("Goodie Bag");
			$scope.equips.addItem("Amulet");
		}
		else if (id == 6) { //Seaside 1
			var doublemiss=  Math.random();
			if (doublemiss < 0.05) {
				if ($scope.items.getIndex("Honey Syrup") >= 0)
				$scope.items.useItem($scope.items.getIndex("Honey Syrup"), "battle");
			}
			$scope.coins += 25;
			$scope.items.addItem("Flower Jar");
			//Booster Hill
			var flowers = Math.random();
			if (flowers < 0.5) {
				$scope.flowers += 12;
			}
			else if (flowers < 0.8) {
				$scope.flowers += 13;
			}
			else if (flowers < 0.95) {
				$scope.flowers += 14;
			}
			else if (flowers < 0.99) {
				$scope.flowers += 15;
			}
			else {
				$scope.flowers += 16;
			}
			//Marrymore
			$scope.items.useItem($scope.items.getIndex("Red Essence"), "battle");
			var pickmeup = Math.random();
			if (pickmeup < 0.15) {
				if ($scope.items.getIndex("Pick Me Up") != -1) {
					$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
				}
			}
			if (pickmeup < 0.4) {
				if ($scope.items.getIndex("Pick Me Up") != -1) {
					$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
				}
			}
			var sandstorm = Math.random();
			if (sandstorm < 0.5) {
				for (var i = 0; i < 3; i++) {
					if ($scope.items.getIndex("Able Juice") != -1) {
						$scope.items.useItem($scope.items.getIndex("Able Juice"), "battle");
					}
				}
			}
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 6;
			$scope.party[pid].currenthp = 41;
			$scope.party[pid].totalhp = 41;
			$scope.party[pid].atk = 32;
			$scope.party[pid].def = 17;
			$scope.party[pid].matk = 26;
			$scope.party[pid].mdef = 19;
			$scope.party.push(new Character("Peach", "Toadstool", "ピーチ", 9, 40, 24, 40, 28, 50, {"weapon": new Item("Slap Glove", "Slap Glove", 'ビンタグローブ', 'It slaps ’em<br>silly', 'プリンセスなビンタで<br>こうげきします', 0, 'glove', 17, 'weapon', null, 50, ["Peach"], {"atk": 40}), "armor": new Item("Polka Dress", "Polka Dress", 'ラブラブドレス', 'A flashy dress', 'ハデなドレスです', 0, 'armor', 49, 'armor', null, 80, ["Peach"], {"def": 24, "mdef": 12}), "accessory": null}));
			//Tadpole Pond
			$scope.equips.addItem("FroggieStick");
			//Booster Pass
			$scope.frogcoins++;
			$scope.items.addItem("KerokeroCola");
		}
		else if (id == 7) { //Seaside 2
		}
		else if (id == 8) { //Sea 1
		}
		else if (id == 9) { //Sea 2
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 8;
			$scope.party[pid].currenthp = 57;
			$scope.party[pid].totalhp = 57;
			$scope.party[pid].atk = 46;
			$scope.party[pid].def = 20;
			$scope.party[pid].matk = 39;
			$scope.party[pid].mdef = 22;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 7;
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 8;
			$scope.party[pid].currenthp = 72;
			$scope.party[pid].totalhp = 72;
			$scope.party[pid].atk = 70;
			$scope.party[pid].def = 29;
			$scope.party[pid].matk = 33;
			$scope.party[pid].mdef = 21;
			pid = $scope.party.getIndex("Bowser");
			$scope.party[pid].level = 9;
			$scope.party[pid].currenthp = 88;
			$scope.party[pid].totalhp = 88;
			$scope.party[pid].atk = 90;
			$scope.party[pid].def = 56;
			$scope.party[pid].matk = 24;
			$scope.party[pid].mdef = 32;
			pid = $scope.party.getIndex("Peach");
			$scope.party[pid].level = 10;
			$scope.party[pid].currenthp = 56;
			$scope.party[pid].totalhp = 56;
			$scope.party[pid].atk = 43;
			$scope.party[pid].def = 27;
			$scope.party[pid].matk = 45;
			$scope.party[pid].mdef = 32;
		}
		else if (id == 10) { // Sunken Ship 1
			$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			$scope.coins += 100;
			$scope.items.addItem("KerokeroCola");
			$scope.equips.addItem("Safety Ring");
		}
		else if (id == 11) { // Sunken Ship 2
			$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			var itemdrop = Math.random();
			if (itemdrop < 0.5)
				$scope.items.addItem("Mushroom");
			$scope.coins += 40;
			$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			var itemdrop = Math.random();
			if (itemdrop < 0.5)
				$scope.items.addItem("Mushroom");
			$scope.coins += 50;
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 9;
			$scope.party[pid].currenthp = 64;
			$scope.party[pid].totalhp = 64;
			$scope.party[pid].atk = 52;
			$scope.party[pid].def = 24;
			$scope.party[pid].matk = 42;
			$scope.party[pid].mdef = 24;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 8;
			$scope.party[pid].currenthp = 50;
			$scope.party[pid].totalhp = 50;
			$scope.party[pid].atk = 35;
			$scope.party[pid].def = 20;
			$scope.party[pid].matk = 30;
			$scope.party[pid].mdef = 21;
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 9;
			$scope.party[pid].currenthp = 80;
			$scope.party[pid].totalhp = 80;
			$scope.party[pid].atk = 78;
			$scope.party[pid].def = 33;
			$scope.party[pid].matk = 37;
			$scope.party[pid].mdef = 23;
			pid = $scope.party.getIndex("Bowser");
			$scope.party[pid].level = 10;
			$scope.party[pid].currenthp = 96;
			$scope.party[pid].totalhp = 96;
			$scope.party[pid].atk = 94;
			$scope.party[pid].def = 60;
			$scope.party[pid].matk = 28;
			$scope.party[pid].mdef = 34;
		}
		else if (id == 12) { // Sunken Ship 3
			$scope.items.useItem($scope.items.getIndex("Sleepy Bomb"), "battle");
			$scope.coins += 50;
			pid = $scope.party.getIndex("Peach");
			$scope.party[pid].level = 11;
			$scope.party[pid].currenthp = 61;
			$scope.party[pid].totalhp = 61;
			$scope.party[pid].atk = 45;
			$scope.party[pid].def = 30;
			$scope.party[pid].matk = 52;
			$scope.party[pid].mdef = 36;
		}
		else if (id == 13) { // Seaside 2
			//Seaside Town
			$scope.items.useItem($scope.items.getIndex("KerokeroCola"), "battle");
			var itemuse = Math.random();
			var x = $scope.items.filter(function(o) {
				return o.id == "Mushroom";
			})
			if (itemuse < 1 / 3 || (itemuse < 2 / 3 && (x == null || x.length == 0))) 
				$scope.items.useItem($scope.items.getIndex("FroggieDrink"), "battle");
			else if (itemuse < 2 / 3)
				$scope.items.useItem($scope.items.getIndex("Mushroom"), "battle");
			$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
			$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
			$scope.coins += 50;
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 10;
			$scope.party[pid].currenthp = 88;
			$scope.party[pid].totalhp = 88;
			$scope.party[pid].atk = 84;
			$scope.party[pid].def = 37;
			$scope.party[pid].matk = 41;
			$scope.party[pid].mdef = 25;
			$scope.items.addItem("Flower Box");
		}
		else if (id == 14) { // Land's End
			for (var i = 0; i < 4; i++) { 
				$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
				var pmudrop = Math.random();
				if (pmudrop < 0.5)
					$scope.items.addItem("Pick Me Up");
				$scope.coins += 30;
			}
			$scope.coins -= 400;
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 13;
			$scope.party[pid].currenthp = 94;
			$scope.party[pid].totalhp = 94;
			$scope.party[pid].atk = 73;
			$scope.party[pid].def = 41;
			$scope.party[pid].matk = 61;
			$scope.party[pid].mdef = 38;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 10;
			$scope.party[pid].currenthp = 72;
			$scope.party[pid].totalhp = 72;
			$scope.party[pid].atk = 41;
			$scope.party[pid].def = 26;
			$scope.party[pid].matk = 38;
			$scope.party[pid].mdef = 27;
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 11;
			$scope.party[pid].currenthp = 96;
			$scope.party[pid].totalhp = 96;
			$scope.party[pid].atk = 90;
			$scope.party[pid].def = 42;
			$scope.party[pid].matk = 45;
			$scope.party[pid].mdef = 28;
			pid = $scope.party.getIndex("Bowser");
			$scope.party[pid].level = 12;
			$scope.party[pid].currenthp = 112;
			$scope.party[pid].totalhp = 112;
			$scope.party[pid].atk = 105;
			$scope.party[pid].def = 68;
			$scope.party[pid].matk = 36;
			$scope.party[pid].mdef = 38;
			pid = $scope.party.getIndex("Peach");
			$scope.party[pid].level = 12;
			$scope.party[pid].currenthp = 67;
			$scope.party[pid].totalhp = 67;
			$scope.party[pid].atk = 48;
			$scope.party[pid].def = 33;
			$scope.party[pid].matk = 57;
			$scope.party[pid].mdef = 40;
			$scope.coins -= 100;
			$scope.coins -= 50;
			$scope.items.useItem($scope.items.getIndex("Fright Bomb"), "battle");
			$scope.coins += 20;
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 12;
			$scope.party[pid].currenthp = 104;
			$scope.party[pid].totalhp = 104;
			$scope.party[pid].atk = 98;
			$scope.party[pid].def = 47;
			$scope.party[pid].matk = 49;
			$scope.party[pid].mdef = 31;
			$scope.equips.addItem("Attack Scarf");
			$scope.equips.addItem("Super Suit");
			$scope.equips.addItem("Troopa Pin");
		}
		else if (id == 15) { //Nimbus
			for (var i = 0; i < 2; i++) {
				if ($scope.items.getIndex("Ice Bomb") != -1) {
					$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
				}
			}
			pid = $scope.party.getIndex("Peach");
			$scope.party[pid].level = 13;
			$scope.party[pid].currenthp = 74;
			$scope.party[pid].totalhp = 74;
			$scope.party[pid].atk = 52;
			$scope.party[pid].def = 36;
			$scope.party[pid].matk = 62;
			$scope.party[pid].mdef = 44;
		}
		else if (id == 16) { //Barrel Volcano 1
			$scope.equips.addItem("Feather");
			var birdoDamage = 0;
			for (i = 0; i < 3; i++) {
				birdoDamage += Math.floor((213 + (6 - Math.floor(Math.random() * 12)) - 130) * 1.5) * 2;
			}
			if (birdoDamage < 777)
				$scope.items.useItem($scope.items.getIndex("Bad Mushroom"), "battle");
			$scope.coins += 30;
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 14;
			$scope.party[pid].currenthp = 102;
			$scope.party[pid].totalhp = 102;
			$scope.party[pid].atk = 78;
			$scope.party[pid].def = 45;
			$scope.party[pid].matk = 68;
			$scope.party[pid].mdef = 42;
			var x = $scope.items.filter(function(o) {
				return o.id == "Fire Bomb";
			});
			var y = $scope.items.filter(function(o) {
				return o.id == "Bad Mushroom";
			});
			if (x != null && x.length >= 2) 
				$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
			else if (y != null && y.length >= 1) 
				$scope.items.useItem($scope.items.getIndex("Bad Mushroom"), "battle");
			$scope.coins+= 200;
			pid = $scope.party.getIndex("Bowser");
			$scope.party[pid].level = 13;
			$scope.party[pid].currenthp = 120;
			$scope.party[pid].totalhp = 120;
			$scope.party[pid].atk = 110;
			$scope.party[pid].def = 72;
			$scope.party[pid].matk = 40;
			$scope.party[pid].mdef = 40;
			var fb = Math.random();
			if (fb < 0.25)
				$scope.items.addItem("Fright Bomb");
		}
		else if (id == 17) { // Barrel Volcano 2
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 13;
			$scope.party[pid].currenthp = 111;
			$scope.party[pid].totalhp = 111;
			$scope.party[pid].atk = 103;
			$scope.party[pid].def = 51;
			$scope.party[pid].matk = 53;
			$scope.party[pid].mdef = 34;
			pid = $scope.party.getIndex("Peach");
			$scope.party[pid].level = 14;
			$scope.party[pid].currenthp = 82;
			$scope.party[pid].totalhp = 82;
			$scope.party[pid].atk = 57;
			$scope.party[pid].def = 40;
			$scope.party[pid].matk = 69;
			$scope.party[pid].mdef = 48;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 12;
			$scope.party[pid].currenthp = 93;
			$scope.party[pid].totalhp = 93;
			$scope.party[pid].atk = 49;
			$scope.party[pid].def = 32;
			$scope.party[pid].matk = 47;
			$scope.party[pid].mdef = 33;
			if ($scope.party[$scope.party.getIndex("Peach")].equips.armor.id == "Work Pants") {
				$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
			}
			else {
				$scope.currentFlowers = $scope.totalFlowers - 12;
			}
			$scope.coins += 10;
			pid = $scope.party.getIndex("Mario");
			$scope.party[pid].level = 15;
			$scope.party[pid].currenthp = 111;
			$scope.party[pid].totalhp = 111;
			$scope.party[pid].atk = 85;
			$scope.party[pid].def = 50;
			$scope.party[pid].matk = 72;
			$scope.party[pid].mdef = 45;
		}
		else if (id == 18) { //Barrel Volcano 3
			if ($scope.items.getIndex("Ice Bomb") >= 0)
				$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
			if ($scope.items.getIndex("Ice Bomb") >= 0) {
				var pmu = Math.random();
				if (pmu < 0.1) {
					if ($scope.items.getIndex("Pick Me Up") >= 0) {
						$scope.items.useItem($scope.items.getIndex("Pick Me Up"), "battle");
					}
				}
				else if (pmu < 0.2) {
					if ($scope.items.getIndex("Able Juice") >= 0) {
						$scope.items.useItem($scope.items.getIndex("Able Juice"), "battle");
					}
				}
				$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
			}
		}
		else if (id == 19) { //Bowser's Keep
			$scope.items.useItem($scope.items.getIndex("Rock Candy"), "battle");
			if ($scope.items.getIndex("Rock Candy") >= 0)
				$scope.items.useItem($scope.items.getIndex("Rock Candy"), "battle");
			else {
				if ($scope.items.getIndex("Fire Bomb") >= 0)
					$scope.items.useItem($scope.items.getIndex("Fire Bomb"), "battle");
				if ($scope.items.getIndex("Ice Bomb") >= 0)
					$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
			}
			$scope.items.addItem("Rock Candy");
			$scope.items.addItem("Rock Candy");
			if ($scope.items.getIndex("Fright Bomb") < 0)
				$scope.items.addItem("Fright Bomb");
			$scope.items.addItem("Ice Bomb");
			$scope.items.addItem("Rock Candy");
			$scope.items.addItem("Rock Candy");
			$scope.items.addItem("Royal Syrup");
			$scope.items.addItem("KerokeroCola");
			$scope.equips.addItem("Super Slap");
		}
		else if (id == 20) {
			$scope.items.useItem($scope.items.getIndex("Fright Bomb"), "battle");
			$scope.coins += 10;
			$scope.coins += 9;
			pid = $scope.party.getIndex("Peach");
			$scope.party[pid].level = 15;
			$scope.party[pid].currenthp = 91;
			$scope.party[pid].totalhp = 91;
			$scope.party[pid].atk = 63;
			$scope.party[pid].def = 43;
			$scope.party[pid].matk = 74;
			$scope.party[pid].mdef = 52;
			$scope.equips.addItem("Ultra Hammer");
		}
		else if (id == 21) {
			$scope.items.useItem($scope.items.getIndex("Rock Candy"), "battle");
			$scope.items.useItem($scope.items.getIndex("Rock Candy"), "battle");
			$scope.coins+= 100;
			pid = $scope.party.getIndex("Bowser");
			$scope.party[pid].level = 14;
			$scope.party[pid].currenthp = 129;
			$scope.party[pid].totalhp = 129;
			$scope.party[pid].atk = 114;
			$scope.party[pid].def = 75;
			$scope.party[pid].matk = 44;
			$scope.party[pid].mdef = 42;
			pid = $scope.party.getIndex("Mallow");
			$scope.party[pid].level = 13;
			$scope.party[pid].currenthp = 106;
			$scope.party[pid].totalhp = 106;
			$scope.party[pid].atk = 53;
			$scope.party[pid].def = 35;
			$scope.party[pid].matk = 52;
			$scope.party[pid].mdef = 36;
		}
		else if (id == 22) {
			var x = $scope.items.filter(function(o) {
				return o.id == "Rock Candy";
			});
			if (x.length > 2)
				$scope.items.addItem("Rock Candy");
			$scope.coins += 50;
			var rc = Math.random();
			if (rc < 0.25)
				$scope.items.addItem("Rock Candy");
			pid = $scope.party.getIndex("Geno");
			$scope.party[pid].level = 14;
			$scope.party[pid].currenthp = 119;
			$scope.party[pid].totalhp = 119;
			$scope.party[pid].atk = 109;
			$scope.party[pid].def = 56;
			$scope.party[pid].matk = 57;
			$scope.party[pid].mdef = 37;
			$scope.coins += 200;
		}
		else if (id == 23) {
			var x = $scope.items.filter(function(o) {
				return o.id == "Ice Bomb";
			});
			if (x.length > 3)
				$scope.items.useItem($scope.items.getIndex("Ice Bomb"), "battle");
			else {
				var x = $scope.items.filter(function(o) {
					return o.id == "Rock Candy";
				});
				if (x.length > 3)
					$scope.items.useItem($scope.items.getIndex("Rock Candy"), "battle");
			}
			$scope.coins += 3;
			$scope.coins += 22;
			$scope.items.addItem("Rock Candy");
			$scope.coins += 46;
		}
		$scope.items.sortItems();
		$scope.equips.sortItems();
	}
	$scope.reset = function() {
		$scope.items = [];
		$scope.equips = [];
		$scope.shop = [];
		$scope.party = [];
		$scope.coins = 0;
		$scope.frogcoins = 0;
		$scope.totalFlowers = 10;
		$scope.currentFlowers = 10;
		$scope.activeState = $scope.menus[0];
		$scope.language = "Japanese";
		$scope.menuSelected = false;
		$scope.allActiveMenus = [];
		$scope.shopMenu = [];
	}
	$scope.chooseMenu = function(id) {
		$scope.reset();
		for (var i = 0; i < id; i++) {
			preMenu(i);
			doMenu(i);
		}
		preMenu(id);
		$scope.loadMenu(id);
	}
	$scope.loadMenu = function(id) {
		$ionicScrollDelegate.scrollTop();
		$scope.menuSelected = true;
		console.log($scope.menuSelected);
		$scope.activeState = $scope.menus[id];
		$scope.splash = true;
		setShopMenu(id);
		console.log($scope.language);
		$scope.allActiveMenus = [
		   {"leftMenu": [($scope.language == "English" ? "Buy" : "かいもの"), ($scope.language == "English" ? "Sell items" : "うる / アイテマ"), ($scope.language == "English" ? "Sell weapons" : "うる / そうびひん"), ($scope.language == "English" ? "Equip" : "そうび")],
			   "coinsLabel": ($scope.language == "English" ? "Coins" : "コイン"),
			   "exitWithB": ($scope.language == "English" ? "Cancel w/B" : "Bボタンでキャンセル")}
		]
		$timeout(function() {$scope.splash = false;}, 2000);
		
		console.log($window.innerHeight);
		
	}
	$scope.echoName = function() {
		console.log($scope.activeState.name);
		return $scope.activeState.name;
	}
	
	
})

.controller('JNamesCtrl', function($scope, $ionicPopup) {
	$scope.quiz = {};
	$scope.getLetterFile = function(letter) {
		var fname = "";
		switch(letter) {
			
			case "ァ": fname = "k_a_small"; break;
			case "ィ": fname = "k_i_small"; break;
			case "ェ": fname = "k_e_small"; break;
			case "ォ": fname = "k_o_small"; break;
			case "ゥ": fname = "k_u_small"; break;
			case "ャ": fname = "k_ya_small"; break;
			case "ュ": fname = "k_yu_small"; break;
			case "ョ": fname = "k_yo_small"; break;
			case "ッ": fname = "k_tsu_small"; break;
			
			case "ア": fname = "k_a"; break;
			case "イ": fname = "k_i"; break;
			case "ウ": fname = "k_u"; break;
			case "エ": fname = "k_e"; break;
			case "オ": fname = "k_o"; break;

			case "カ": fname = "k_ka"; break;
			case "キ": fname = "k_ki"; break;
			case "ク": fname = "k_ku"; break;
			case "ケ": fname = "k_ke"; break;
			case "コ": fname = "k_ko"; break;

			case "サ": fname = "k_sa"; break;
			case "シ": fname = "k_shi"; break;
			case "ス": fname = "k_su"; break;
			case "セ": fname = "k_se"; break;
			case "ソ": fname = "k_so"; break;

			case "タ": fname = "k_ta"; break;
			case "チ": fname = "k_chi"; break;
			case "ツ": fname = "k_tsu"; break;
			case "テ": fname = "k_te"; break;
			case "ト": fname = "k_to"; break;

			case "ナ": fname = "k_na"; break;
			case "ニ": fname = "k_ni"; break;
			case "ヌ": fname = "k_nu"; break;
			case "ネ": fname = "k_ne"; break;
			case "ノ": fname = "k_no"; break;

			case "ハ": fname = "k_ha"; break;
			case "ヒ": fname = "k_hi"; break;
			case "フ": fname = "k_fu"; break;
			case "ヘ": fname = "k_he"; break;
			case "ホ": fname = "k_ho"; break;

			case "マ": fname = "k_ma"; break;
			case "ミ": fname = "k_mi"; break;
			case "ム": fname = "k_mu"; break;
			case "メ": fname = "k_me"; break;
			case "モ": fname = "k_mo"; break;

			case "ヤ": fname = "k_ya"; break;
			case "ユ": fname = "k_yu"; break;
			case "ヨ": fname = "k_yo"; break;

			case "ラ": fname = "k_ra"; break;
			case "リ": fname = "k_ri"; break;
			case "ル": fname = "k_ru"; break;
			case "レ": fname = "k_re"; break;
			case "ロ": fname = "k_ro"; break;

			case "ワ": fname = "k_wa"; break;
			case "ヲ": fname = "k_wo"; break;

			case "ン": fname = "k_n"; break;

			case "ガ": fname = "k_ga"; break;
			
			case "ギ": fname = "k_gi"; break;
			case "グ": fname = "k_gu"; break;
			case "ゲ": fname = "k_ge"; break;
			case "ゴ": fname = "k_go"; break;

			case "ザ": fname = "k_za"; break;
			case "ジ": fname = "k_ji"; break;
			case "ズ": fname = "k_zu"; break;
			case "ゼ": fname = "k_ze"; break;
			case "ゾ": fname = "k_zo"; break;

			case "ダ": fname = "k_da"; break;
			case "ヂ": fname = "k_ji"; break;
			case "ヅ": fname = "k_zu"; break;
			case "デ": fname = "k_de"; break;
			case "ド": fname = "k_do"; break;

			case "バ": fname = "k_ba"; break;
			case "ビ": fname = "k_bi"; break;
			case "ブ": fname = "k_bu"; break;
			case "ベ": fname = "k_be"; break;
			case "ボ": fname = "k_bo"; break;

			case "パ": fname = "k_pa"; break;
			case "ピ": fname = "k_pi"; break;
			case "プ": fname = "k_pu"; break;
			case "ペ": fname = "k_pe"; break;
			case "ポ": fname = "k_po"; break;
			
			case "ー": fname = "-"; break;

			case "ぁ": fname = "h_a_small"; break;
			case "ぃ": fname = "h_i_small"; break;
			case "ぇ": fname = "h_e_small"; break;
			case "ぉ": fname = "h_o_small"; break;
			case "ぅ": fname = "h_u_small"; break;
			case "ゃ": fname = "h_ya_small"; break;
			case "ゅ": fname = "h_yu_small"; break;
			case "ょ": fname = "h_yo_small"; break;
			case "っ": fname = "h_tsu_small"; break;
			
			case "あ": fname = "h_a"; break;
			case "い": fname = "h_i"; break;
			case "う": fname = "h_u"; break;
			case "え": fname = "h_e"; break;
			case "お": fname = "h_o"; break;

			case "か": fname = "h_ka"; break;
			case "き": fname = "h_ki"; break;
			case "く": fname = "h_ku"; break;
			case "け": fname = "h_ke"; break;
			case "こ": fname = "h_ko"; break;

			case "さ": fname = "h_sa"; break;
			case "し": fname = "h_shi"; break;
			case "す": fname = "h_su"; break;
			case "せ": fname = "h_se"; break;
			case "そ": fname = "h_so"; break;

			case "た": fname = "h_ta"; break;
			case "ち": fname = "h_chi"; break;
			case "つ": fname = "h_tsu"; break;
			case "て": fname = "h_te"; break;
			case "と": fname = "h_to"; break;

			case "な": fname = "h_na"; break;
			case "に": fname = "h_ni"; break;
			case "ぬ": fname = "h_nu"; break;
			case "ね": fname = "h_ne"; break;
			case "の": fname = "h_no"; break;

			case "は": fname = "h_ha"; break;
			case "ひ": fname = "h_hi"; break;
			case "ふ": fname = "h_fu"; break;
			case "へ": fname = "h_he"; break;
			case "ほ": fname = "h_ho"; break;

			case "ま": fname = "h_ma"; break;
			case "み": fname = "h_mi"; break;
			case "む": fname = "h_mu"; break;
			case "め": fname = "h_me"; break;
			case "も": fname = "h_mo"; break;

			case "や": fname = "h_ya"; break;
			case "ゆ": fname = "h_yu"; break;
			case "よ": fname = "h_yo"; break;

			case "ら": fname = "h_ra"; break;
			case "り": fname = "h_ri"; break;
			case "る": fname = "h_ru"; break;
			case "れ": fname = "h_re"; break;
			case "ろ": fname = "h_ro"; break;

			case "わ": fname = "h_wa"; break;
			case "を": fname = "h_wo"; break;

			case "ん": fname = "h_n"; break;

			case "が": fname = "h_ga"; break;
			
			case "ぎ": fname = "h_gi"; break;
			case "ぐ": fname = "h_gu"; break;
			case "げ": fname = "h_ge"; break;
			case "ご": fname = "h_go"; break;

			case "ざ": fname = "h_za"; break;
			case "じ": fname = "h_ji"; break;
			case "ず": fname = "h_zu"; break;
			case "ぜ": fname = "h_ze"; break;
			case "ぞ": fname = "h_zo"; break;

			case "だ": fname = "h_da"; break;
			case "ぢ": fname = "h_ji"; break;
			case "づ": fname = "h_zu"; break;
			case "で": fname = "h_de"; break;
			case "ど": fname = "h_do"; break;

			case "ば": fname = "h_ba"; break;
			case "び": fname = "h_bi"; break;
			case "ぶ": fname = "h_bu"; break;
			case "べ": fname = "h_be"; break;
			case "ぼ": fname = "h_bo"; break;

			case "ぱ": fname = "h_pa"; break;
			case "ぴ": fname = "h_pi"; break;
			case "ぷ": fname = "h_pu"; break;
			case "ぺ": fname = "h_pe"; break;
			case "ぽ": fname = "h_po"; break;

		}
		
		return fname;
	}
	var questions = [{	"question": "リフレッシュジュース",
						"type": "drink",
						"hint": "Rifuresshu Jūsu",
						"answers":["Able Juice", "Pick Me Up", "Honey Syrup", "Mushroom", "Red Essence"],
						"correct": 1 },
					{	"question": "どくキノコ",
						"type": "drink",
						"hint": "Doku Kinoko",
						"answers":["Able Juice", "Bad Mushroom", "Mushroom", "Mid Mushroom", "Pick Me Up"],
						"correct": 2 },
					{	"question": "ツヨクナール",
						"type": "drink",
						"hint": "Tsuyoku Nāru",
						"answers":["Energizer", "FroggieDrink", "Honey Syrup", "Rock Candy", "Sleepy Bomb"],
						"correct": 1 },
					{	"question": "かえんだま",
						"type": "bomb",
						"hint": "Kaendama",
						"answers":["Fire Bomb", "Fright Bomb", "Ice Bomb", "Rock Candy", "Sleepy Bomb"],
						"correct": 1 },
					{	"question": "フラワーギフト",
						"type": "none",
						"hint": "Furawā Gifuto",
						"answers":["Flower Box", "Flower Jar", "Flower Tab", "Goodie Bag", "Wallet"],
						"correct": 1 },
					{	"question": "フラワーセット",
						"type": "none",
						"hint": "Furawā Setto",
						"answers":["Flower Box", "Flower Jar", "Flower Tab", "Goodie Bag", "Wallet"],
						"correct": 2 },
					{	"question": "フラワーカプセル",
						"type": "none",
						"hint": "Furawā Kapuseru",
						"answers":["Flower Box", "Flower Jar", "Flower Tab", "Goodie Bag", "Wallet"],
						"correct": 3 },
					{	"question": "びびりだま",
						"type": "bomb",
						"hint": "Bibiridama",
						"answers":["Fire Bomb", "Fright Bomb", "Ice Bomb", "Rock Candy", "Sleepy Bomb"],
						"correct": 2 },
					{	"question": "オタマドリンク",
						"type": "drink",
						"hint": "Otama Dorinku",
						"answers":["Energizer", "FroggieDrink", "Honey Syrup", "KerokeroCola", "Pick Me Up"],
						"correct": 2 },
					{	"question": "ふくぶくろ",
						"type": "question",
						"hint": "Fukubukuro",
						"answers":["Flower Box", "Flower Jar", "Flower Tab", "Goodie Bag", "Wallet"],
						"correct": 4 },
					{	"question": "ハニーシロップ",
						"type": "drink",
						"hint": "Hanī Shiroppu",
						"answers":["Able Juice", "Energizer", "Honey Syrup", "Mushroom", "Pick Me Up"],
						"correct": 3 },
					{	"question": "こおりだま",
						"type": "bomb",
						"hint": "Kōridama",
						"answers":["Fire Bomb", "Fright Bomb", "Ice Bomb", "Rock Candy", "Sleepy Bomb"],
						"correct": 3 },
					{	"question": "ケロケロドリンク",
						"type": "drink",
						"hint": "Kerokero Dorinku",
						"answers":["FroggieDrink", "KerokeroCola", "Mushroom", "Pick Me Up", "Red Essence"],
						"correct": 2 },
					{	"question": "メイプルシロップ",
						"type": "drink",
						"hint": "Meipuru Shiroppu",
						"answers":["Able Juice", "KerokeroCola", "Maple Syrup", "Mid Mushroom", "Royal Syrup"],
						"correct": 3 },
					{	"question": "スーパーキノコ",
						"type": "drink",
						"hint": "Sūpā Kinoko",
						"answers":["Able Juice", "KerokeroCola", "Maple Syrup", "Mid Mushroom", "Royal Syrup"],
						"correct": 4 },
					{	"question": "キノコ",
						"type": "drink",
						"hint": "Kinoko",
						"answers":["Able Juice", "Pick Me Up", "Honey Syrup", "Mushroom", "Red Essence"],
						"correct": 4 },
					{	"question": "ふっかつドリンク",
						"type": "drink",
						"hint": "Fukkatsu Dorinku",
						"answers":["Able Juice", "Honey Syrup", "FroggieDrink", "KerokeroCola", "Pick Me Up"],
						"correct": 5 },
					{	"question": "レッドヨッシーエキス",
						"type": "drink",
						"hint": "Reddo Yosshī Ekisu",
						"answers":["Able Juice", "FroggieDrink", "KerokeroCola", "Pick Me Up", "Red Essence"],
						"correct": 5 },
					{	"question": "こんぺいとう",
						"type": "bomb",
						"hint": "Konpeitō",
						"answers":["Fire Bomb", "Fright Bomb", "Ice Bomb", "Rock Candy", "Sleepy Bomb"],
						"correct": 4 },
					{	"question": "ロイヤルシロップ",
						"type": "drink",
						"hint": "Roiyaru Shiroppu",
						"answers":["KerokeroCola", "Maple Syrup", "Pick Me Up", "Royal Syrup", "Yoshi Cookie"],
						"correct": 4 },
					{	"question": "ねむりだま",
						"type": "bomb",
						"hint": "Nemuridama",
						"answers":["Fire Bomb", "Fright Bomb", "Ice Bomb", "Rock Candy", "Sleepy Bomb"],
						"correct": 5 },
					{	"question": "サイフ",
						"type": "none",
						"hint": "Saifu",
						"answers":["Flower Box", "Flower Jar", "Flower Tab", "Goodie Bag", "Wallet"],
						"correct": 5 },
					{	"question": "ヨッシーのクッキー",
						"type": "dot",
						"hint": "Yosshī no Kukkī",
						"answers":["Goodie Bag", "KerokeroCola", "Red Essence", "Wallet", "Yoshi Cookie"],
						"correct": 5 },
					{	"question": "ブッキーのおまもり",
						"type": "accessory",
						"hint": "Bukkī no Omamori",
						"answers":["Amulet", "Attack Scarf", "Exp. Booster", "Safety Ring", "Wake Up Pin"],
						"correct": 1 },
					{	"question": "ジャンパースカーフ",
						"type": "accessory",
						"hint": "Janpā Sukāfu",
						"answers":["Amulet", "Attack Scarf", "Exp. Booster", "Jump Shoes", "Zoom Shoes"],
						"correct": 2 },
					{	"question": "シンバル",
						"type": "music",
						"hint": "Shinbaru",
						"answers":["Cymbals", "Finger Shot", "FroggieStick", "Punch Glove", "Sonic Cymbal"],
						"correct": 1 },
					{	"question": "スーパーダブルパンチ",
						"type": "glove",
						"hint": "Sūpā Daburu Panchi",
						"answers":["Finger Shot", "Double Punch", "Hurly Gloves", "Mega Glove", "Punch Glove"],
						"correct": 2 },
					{	"question": "あなたをこえたくて",
						"type": "accessory",
						"hint": "Anata o Koetakute",
						"answers":["Amulet", "Exp. Booster", "Feather", "Safety Ring", "Troopa Pin"],
						"correct": 2 },
					{	"question": "ドドのはね",
						"type": "accessory",
						"hint": "Dodo no Hane",
						"answers":["Attack Scarf", "Exp. Booster", "Feather", "Safety Ring", "Troopa Pin"],
						"correct": 3 },
					{	"question": "フィンガーショット",
						"type": "geno",
						"hint": "Fingā Shotto",
						"answers":["Finger Shot", "Double Punch", "Hurly Gloves", "Mega Glove", "Star Gun"],
						"correct": 1 },
					{	"question": "ハンマー",
						"type": "hammer",
						"hint": "Hanmā",
						"answers":["Cymbals", "Hammer", "Lucky Hammer", "Super Hammer", "Ultra Hamer"],
						"correct": 2 },
					{	"question": "ぶんなげグローブ",
						"type": "glove",
						"hint": "Bunnage Gurōbu",
						"answers":["Double Punch", "Hurly Gloves", "Mega Glove", "Punch Glove", "Super Slap"],
						"correct": 2 },
					{	"question": "かいてんシューズ",
						"type": "accessory",
						"hint": "Kaiten Shūzu",
						"answers":["Antidote", "Amulet", "Attack Scarf", "Jump Shoes", "Zoom Shoes"],
						"correct": 4 },
					{	"question": "でかパンチグローブ",
						"type": "glove",
						"hint": "Deka Panchi Gurōbu",
						"answers":["Double Punch", "Hurly Gloves", "Mega Glove", "Punch Glove", "Super Slap"],
						"correct": 3 },
					{	"question": "パンチグローブ",
						"type": "glove",
						"hint": "Panchi Gurōbu",
						"answers":["Double Punch", "Hurly Gloves", "Mega Glove", "Punch Glove", "Super Slap"],
						"correct": 4 },
					{	"question": "セーフティーリング",
						"type": "accessory",
						"hint": "Sēfutī Ringu",
						"answers":["Amulet", "Exp. Booster", "Feather", "Safety Ring", "Troopa Pin"],
						"correct": 4 },
					{	"question": "ふつうのつなぎ",
						"type": "armor",
						"hint": "Futsū no Tsunagi",
						"answers":["Pants", "Polka Dress", "Shirt", "Super Suit", "Work Pants"],
						"correct": 3 },
					{	"question": "センス",
						"type": "fan",
						"hint": "Sensu",
						"answers":["Finger Shot", "FroggieStick", "Hurly Gloves", "Sonic Cymbal", "War Fan"],
						"correct": 5 },
					{	"question": "スーパージャンパー",
						"type": "armor",
						"hint": "Sūpā Janpā",
						"answers":["Pants", "Polka Dress", "Shirt", "Super Suit", "Work Pants"],
						"correct":  4},
					{	"question": "パタパタくんしょう",
						"type": "accessory",
						"hint": "Patapata Kunshō",
						"answers":["Amulet", "Exp. Booster", "Feather", "Safety Ring", "Troopa Pin"],
						"correct": 5 },
					{	"question": "パタパタこうら",
						"type": "shell",
						"hint": "Patapata Kōra",
						"answers":["Hammer", "Double Punch", "Hurly Gloves", "Noknok Shell", "Troopa Shell"],
						"correct": 5 },
					{	"question": "ぼんやりふせぎバッジ",
						"type": "accessory",
						"hint": "Bon'yari Fusegi Bajji",
						"answers":["Amulet", "Exp. Booster", "Jump Shoes", "Wake Up Pin", "Trueform Pin"],
						"correct": 4 },
					{	"question": "ばっちいパンツ",
						"type": "armor",
						"hint": "Batchī Pantsu",
						"answers":["Pants", "Polka Dress", "Shirt", "Super Suit", "Work Pants"],
						"correct": 5 },
					{	"question": "シュビビンシューズ",
							"type": "accessory",
							"hint": "Shubibin Shūzu",
							"answers":["Amulet", "Attack Scarf", "Exp. Booster", "Jump Shoes", "Zoom Shoes"],
							"correct": 5 }];
	var activeQuestionArray = [];
	$scope.quiz.selectedQuestion = {};
	$scope.questionsAttempted = questions.length - 1;

	function setQuestion () {
		$scope.questionsAttempted++;
		if ($scope.questionsAttempted == questions.length) {
			activeQuestionArray = shuffle(questions);
			$scope.questionsAttempted = 0;
		}
		$scope.quiz.selectedQuestion = activeQuestionArray[$scope.questionsAttempted];
	}
	
	$scope.isCorrect = function(answer) {
		 
		if (answer == $scope.quiz.selectedQuestion.answers[$scope.quiz.selectedQuestion.correct - 1]) {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Correct!',
			     template: $scope.quiz.selectedQuestion.question + " is <span class='right-answer'><b>" + answer + "</b></span>.",
			     buttons: [{ text: "OK", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		else {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Incorrect',
			     template: $scope.quiz.selectedQuestion.question + " is not " + answer + ".",
				     buttons: [{ text: "Try Again", type: 'button-positive'},
				               { text: "New Question", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		alertPopup;
	}
	
	setQuestion();
})


.controller('JNames2Ctrl', function($scope, $ionicPopup) {
	$scope.quiz = {};
	$scope.getLetterFile = function(letter) {
		var fname = "";
		switch(letter) {
			
			case "ァ": fname = "k_a_small"; break;
			case "ィ": fname = "k_i_small"; break;
			case "ェ": fname = "k_e_small"; break;
			case "ォ": fname = "k_o_small"; break;
			case "ゥ": fname = "k_u_small"; break;
			case "ャ": fname = "k_ya_small"; break;
			case "ュ": fname = "k_yu_small"; break;
			case "ョ": fname = "k_yo_small"; break;
			case "ッ": fname = "k_tsu_small"; break;
			
			case "ア": fname = "k_a"; break;
			case "イ": fname = "k_i"; break;
			case "ウ": fname = "k_u"; break;
			case "エ": fname = "k_e"; break;
			case "オ": fname = "k_o"; break;

			case "カ": fname = "k_ka"; break;
			case "キ": fname = "k_ki"; break;
			case "ク": fname = "k_ku"; break;
			case "ケ": fname = "k_ke"; break;
			case "コ": fname = "k_ko"; break;

			case "サ": fname = "k_sa"; break;
			case "シ": fname = "k_shi"; break;
			case "ス": fname = "k_su"; break;
			case "セ": fname = "k_se"; break;
			case "ソ": fname = "k_so"; break;

			case "タ": fname = "k_ta"; break;
			case "チ": fname = "k_chi"; break;
			case "ツ": fname = "k_tsu"; break;
			case "テ": fname = "k_te"; break;
			case "ト": fname = "k_to"; break;

			case "ナ": fname = "k_na"; break;
			case "ニ": fname = "k_ni"; break;
			case "ヌ": fname = "k_nu"; break;
			case "ネ": fname = "k_ne"; break;
			case "ノ": fname = "k_no"; break;

			case "ハ": fname = "k_ha"; break;
			case "ヒ": fname = "k_hi"; break;
			case "フ": fname = "k_fu"; break;
			case "ヘ": fname = "k_he"; break;
			case "ホ": fname = "k_ho"; break;

			case "マ": fname = "k_ma"; break;
			case "ミ": fname = "k_mi"; break;
			case "ム": fname = "k_mu"; break;
			case "メ": fname = "k_me"; break;
			case "モ": fname = "k_mo"; break;

			case "ヤ": fname = "k_ya"; break;
			case "ユ": fname = "k_yu"; break;
			case "ヨ": fname = "k_yo"; break;

			case "ラ": fname = "k_ra"; break;
			case "リ": fname = "k_ri"; break;
			case "ル": fname = "k_ru"; break;
			case "レ": fname = "k_re"; break;
			case "ロ": fname = "k_ro"; break;

			case "ワ": fname = "k_wa"; break;
			case "ヲ": fname = "k_wo"; break;

			case "ン": fname = "k_n"; break;

			case "ガ": fname = "k_ga"; break;
			
			case "ギ": fname = "k_gi"; break;
			case "グ": fname = "k_gu"; break;
			case "ゲ": fname = "k_ge"; break;
			case "ゴ": fname = "k_go"; break;

			case "ザ": fname = "k_za"; break;
			case "ジ": fname = "k_ji"; break;
			case "ズ": fname = "k_zu"; break;
			case "ゼ": fname = "k_ze"; break;
			case "ゾ": fname = "k_zo"; break;

			case "ダ": fname = "k_da"; break;
			case "ヂ": fname = "k_ji"; break;
			case "ヅ": fname = "k_zu"; break;
			case "デ": fname = "k_de"; break;
			case "ド": fname = "k_do"; break;

			case "バ": fname = "k_ba"; break;
			case "ビ": fname = "k_bi"; break;
			case "ブ": fname = "k_bu"; break;
			case "ベ": fname = "k_be"; break;
			case "ボ": fname = "k_bo"; break;

			case "パ": fname = "k_pa"; break;
			case "ピ": fname = "k_pi"; break;
			case "プ": fname = "k_pu"; break;
			case "ペ": fname = "k_pe"; break;
			case "ポ": fname = "k_po"; break;
			
			case "ー": fname = "-"; break;

			case "ぁ": fname = "h_a_small"; break;
			case "ぃ": fname = "h_i_small"; break;
			case "ぇ": fname = "h_e_small"; break;
			case "ぉ": fname = "h_o_small"; break;
			case "ぅ": fname = "h_u_small"; break;
			case "ゃ": fname = "h_ya_small"; break;
			case "ゅ": fname = "h_yu_small"; break;
			case "ょ": fname = "h_yo_small"; break;
			case "っ": fname = "h_tsu_small"; break;
			
			case "あ": fname = "h_a"; break;
			case "い": fname = "h_i"; break;
			case "う": fname = "h_u"; break;
			case "え": fname = "h_e"; break;
			case "お": fname = "h_o"; break;

			case "か": fname = "h_ka"; break;
			case "き": fname = "h_ki"; break;
			case "く": fname = "h_ku"; break;
			case "け": fname = "h_ke"; break;
			case "こ": fname = "h_ko"; break;

			case "さ": fname = "h_sa"; break;
			case "し": fname = "h_shi"; break;
			case "す": fname = "h_su"; break;
			case "せ": fname = "h_se"; break;
			case "そ": fname = "h_so"; break;

			case "た": fname = "h_ta"; break;
			case "ち": fname = "h_chi"; break;
			case "つ": fname = "h_tsu"; break;
			case "て": fname = "h_te"; break;
			case "と": fname = "h_to"; break;

			case "な": fname = "h_na"; break;
			case "に": fname = "h_ni"; break;
			case "ぬ": fname = "h_nu"; break;
			case "ね": fname = "h_ne"; break;
			case "の": fname = "h_no"; break;

			case "は": fname = "h_ha"; break;
			case "ひ": fname = "h_hi"; break;
			case "ふ": fname = "h_fu"; break;
			case "へ": fname = "h_he"; break;
			case "ほ": fname = "h_ho"; break;

			case "ま": fname = "h_ma"; break;
			case "み": fname = "h_mi"; break;
			case "む": fname = "h_mu"; break;
			case "め": fname = "h_me"; break;
			case "も": fname = "h_mo"; break;

			case "や": fname = "h_ya"; break;
			case "ゆ": fname = "h_yu"; break;
			case "よ": fname = "h_yo"; break;

			case "ら": fname = "h_ra"; break;
			case "り": fname = "h_ri"; break;
			case "る": fname = "h_ru"; break;
			case "れ": fname = "h_re"; break;
			case "ろ": fname = "h_ro"; break;

			case "わ": fname = "h_wa"; break;
			case "を": fname = "h_wo"; break;

			case "ん": fname = "h_n"; break;

			case "が": fname = "h_ga"; break;
			
			case "ぎ": fname = "h_gi"; break;
			case "ぐ": fname = "h_gu"; break;
			case "げ": fname = "h_ge"; break;
			case "ご": fname = "h_go"; break;

			case "ざ": fname = "h_za"; break;
			case "じ": fname = "h_ji"; break;
			case "ず": fname = "h_zu"; break;
			case "ぜ": fname = "h_ze"; break;
			case "ぞ": fname = "h_zo"; break;

			case "だ": fname = "h_da"; break;
			case "ぢ": fname = "h_ji"; break;
			case "づ": fname = "h_zu"; break;
			case "で": fname = "h_de"; break;
			case "ど": fname = "h_do"; break;

			case "ば": fname = "h_ba"; break;
			case "び": fname = "h_bi"; break;
			case "ぶ": fname = "h_bu"; break;
			case "べ": fname = "h_be"; break;
			case "ぼ": fname = "h_bo"; break;

			case "ぱ": fname = "h_pa"; break;
			case "ぴ": fname = "h_pi"; break;
			case "ぷ": fname = "h_pu"; break;
			case "ぺ": fname = "h_pe"; break;
			case "ぽ": fname = "h_po"; break;

		}
		
		return fname;
	}
	var questions = [{	"question": "Able Juice",
						"type": "drink",
						"hint": "Rifuresshu Jūsu",
						"answers":["リフレッシュジュース", "ふっかつドリンク", "ニーシロップ", "キノコ", "レッドヨッシーエキス"],
						"correct": 1 },
					{	"question": "Bad Mushroom",
						"type": "drink",
						"hint": "Doku Kinoko",
						"answers":["リフレッシュジュース", "どくキノコ", "キノコ", "スーパーキノコ", "メイプルシロップ"],
						"correct": 2 },
					{	"question": "Energizer",
						"type": "drink",
						"hint": "Tsuyoku Nāru",
						"answers":["ツヨクナール", "オタマドリンク", "ハニーシロップ", "カタクナール", "ミンナツヨクナール"],
						"correct": 1 },
					{	"question": "Fire Bomb",
						"type": "bomb",
						"hint": "Kaendama",
						"answers":["かえんだま", "びびりだま", "こおりだま", "こんぺいとう", "ねむりだま"],
						"correct": 1 },
					{	"question": "Flower Box",
						"type": "none",
						"hint": "Furawā Gifuto",
						"answers":["フラワーギフト", "フラワーセット", "フラワーカプセル", "ブリリアントカード", "サイフ"],
						"correct": 1 },
					{	"question": "Flower Jar",
						"type": "none",
						"hint": "Furawā Setto",
						"answers":["フラワーギフト", "フラワーセット", "フラワーカプセル", "ブリリアントカード", "サイフ"],
						"correct": 2 },
					{	"question": "Flower Tab",
						"type": "none",
						"hint": "Furawā Kapuseru",
						"answers":["フラワーギフト", "フラワーセット", "フラワーカプセル", "ブリリアントカード", "サイフ"],
						"correct": 3 },
					{	"question": "Fright Bomb",
						"type": "bomb",
						"hint": "Bibiridama",
						"answers":["かえんだま", "びびりだま", "こおりだま", "こんぺいとう", "ねむりだま"],
						"correct": 2 },
					{	"question": "FroggieDrink",
						"type": "drink",
						"hint": "Otama Dorinku",
						"answers":["ツヨクナール", "オタマドリンク", "ハニーシロップ", "ケロケロドリンク", "リフレッシュジュース"],
						"correct": 2 },
					{	"question": "Honey Syrup",
						"type": "drink",
						"hint": "Hanī Shiroppu",
						"answers":["リフレッシュジュース", "ツヨクナール", "ハニーシロップ", "キノコ", "ふっかつドリンク"],
						"correct": 3 },
					{	"question": "Ice Bomb",
						"type": "bomb",
						"hint": "Kōridama",
						"answers":["かえんだま", "びびりだま", "こおりだま", "こんぺいとう", "ねむりだま"],
						"correct": 3 },
					{	"question": "KerokeroCola",
						"type": "drink",
						"hint": "Kerokero Dorinku",
						"answers":["オタマドリンク", "ケロケロドリンク", "リフレッシュジュース", "ツヨクナール", "レッドヨッシーエキス"],
						"correct": 2 },
					{	"question": "Maple Syrup",
						"type": "drink",
						"hint": "Meipuru Shiroppu",
						"answers":["リフレッシュジュース", "ケロケロドリンク", "メイプルシロップ", "スーパーキノコ", "ロイヤルシロップ"],
						"correct": 3 },
					{	"question": "Mid Mushroom",
						"type": "drink",
						"hint": "Sūpā Kinoko",
						"answers":["リフレッシュジュース", "ケロケロドリンク", "メイプルシロップ", "スーパーキノコ", "ロイヤルシロップ"],
						"correct": 4 },
					{	"question": "Mushroom",
						"type": "drink",
						"hint": "Kinoko",
						"answers":["リフレッシュジュース", "ふっかつドリンク", "ハニーシロップ", "キノコ", "レッドヨッシーエキス"],
						"correct": 4 },
					{	"question": "Pick Me Up",
						"type": "drink",
						"hint": "Fukkatsu Dorinku",
						"answers":["リフレッシュジュース", "ハニーシロップ", "オタマドリンク", "ケロケロドリンク", "ふっかつドリンク"],
						"correct": 5 },
					{	"question": "Red Essence",
						"type": "drink",
						"hint": "Reddo Yosshī Ekisu",
						"answers":["リフレッシュジュース", "オタマドリンク", "ケロケロドリンク", "ふっかつドリンク", "レッドヨッシーエキス"],
						"correct": 5 },
					{	"question": "Rock Candy",
						"type": "bomb",
						"hint": "Konpeitō",
						"answers":["かえんだま", "びびりだま", "こおりだま", "こんぺいとう", "ねむりだま"],
						"correct": 4 },
					{	"question": "Royal Syrup",
						"type": "drink",
						"hint": "Roiyaru Shiroppu",
						"answers":["ケロケロドリンク", "メイプルシロップ", "ふっかつドリンク", "ロイヤルシロップ", "スーパーキノコ"],
						"correct": 4 },
					{	"question": "Sleepy Bomb",
						"type": "bomb",
						"hint": "Nemuridama",
						"answers":["かえんだま", "びびりだま", "こおりだま", "こんぺいとう", "ねむりだま"],
						"correct": 5 },
					{	"question": "Wallet",
						"type": "none",
						"hint": "Saifu",
						"answers":["フラワーギフト", "フラワーセット", "フラワーカプセル", "ブリリアントカード", "サイフ"],
						"correct": 5 },
					{	"question": "Amulet",
						"type": "accessory",
						"hint": "Bukkī no Omamori",
						"answers":["ブッキーのおまもり", "かいてんシューズ", "あなたをこえたくて", "セーフティーリング", "ぼんやりふせぎバッジ"],
						"correct": 1 },
					{	"question": "Attack Scarf",
						"type": "accessory",
						"hint": "Janpā Sukāfu",
						"answers":["ブッキーのおまもり", "ジャンパースカーフ", "あなたをこえたくて", "かいてんシューズ", "シュビビンシューズ"],
						"correct": 2 },
					{	"question": "Double Punch",
						"type": "glove",
						"hint": "Sūpā Daburu Panchi",
						"answers":["ちょービンタグローブ", "スーパーダブルパンチ", "ぶんなげグローブ", "でかパンチグローブ", "パンチグローブ"],
						"correct": 2 },
					{	"question": "Exp. Booster",
						"type": "accessory",
						"hint": "Anata o Koetakute",
						"answers":["ブッキーのおまもり", "あなたをこえたくて", "ドドのはね", "セーフティーリング", "パタパタくんしょう"],
						"correct": 2 },
					{	"question": "Feather",
						"type": "accessory",
						"hint": "Dodo no Hane",
						"answers":["ジャンパースカーフ", "あなたをこえたくて", "ドドのはね", "セーフティーリング", "パタパタくんしょう"],
						"correct": 3 },
					{	"question": "Hurly Gloves",
						"type": "glove",
						"hint": "Bunnage Gurōbu",
						"answers":["スーパーダブルパンチ", "ぶんなげグローブ", "でかパンチグローブ", "パンチグローブ", "ちょービンタグローブ"],
						"correct": 2 },
					{	"question": "Jump Shoes",
						"type": "accessory",
						"hint": "Kaiten Shūzu",
						"answers":["どくふせぎバッジ", "ブッキーのおまもり", "ジャンパースカーフ", "かいてんシューズ", "シュビビンシューズ"],
						"correct": 4 },
					{	"question": "Mega Glove",
						"type": "glove",
						"hint": "Deka Panchi Gurōbu",
						"answers":["スーパーダブルパンチ", "ぶんなげグローブ", "でかパンチグローブ", "パンチグローブ", "ちょービンタグローブ"],
						"correct": 3 },
					{	"question": "Punch Glove",
						"type": "glove",
						"hint": "Panchi Gurōbu",
						"answers":["スーパーダブルパンチ", "ぶんなげグローブ", "でかパンチグローブ", "パンチグローブ", "ちょービンタグローブ"],
						"correct": 4 },
					{	"question": "Safety Ring",
						"type": "accessory",
						"hint": "Sēfutī Ringu",
						"answers":["ブッキーのおまもり", "あなたをこえたくて", "ドドのはね", "セーフティーリング", "パタパタくんしょう"],
						"correct": 4 },
					{	"question": "Shirt",
						"type": "armor",
						"hint": "Futsū no Tsunagi",
						"answers":["ふつうのパンツ", "ラブラブドレス", "ふつうのつなぎ", "スーパージャンパー", "ばっちいパンツ"],
						"correct": 3 },
					{	"question": "Super Suit",
						"type": "armor",
						"hint": "Sūpā Janpā",
						"answers":["ふつうのパンツ", "ラブラブドレス", "ふつうのつなぎ", "スーパージャンパー", "ばっちいパンツ"],
						"correct":  4},
					{	"question": "Troopa Pin",
						"type": "accessory",
						"hint": "Patapata Kunshō",
						"answers":["ブッキーのおまもり", "あなたをこえたくて", "ドドのはね", "セーフティーリング", "パタパタくんしょう"],
						"correct": 5 },
					{	"question": "Wake Up Pin",
						"type": "accessory",
						"hint": "Bon'yari Fusegi Bajji",
						"answers":["ブッキーのおまもり", "あなたをこえたくて", "かいてんシューズ", "ぼんやりふせぎバッジ", "へんしんふせぎバッジ"],
						"correct": 4 },
					{	"question": "Work Pants",
						"type": "armor",
						"hint": "Batchī Pantsu",
						"answers":["ふつうのパンツ", "ラブラブドレス", "ふつうのつなぎ", "スーパージャンパー", "ばっちいパンツ"],
						"correct": 5 },
					{	"question": "Zoom Shoes",
							"type": "accessory",
							"hint": "Shubibin Shūzu",
							"answers":["ブッキーのおまもり", "ジャンパースカーフ", "あなたをこえたくて", "かいてんシューズ", "シュビビンシューズ"],
							"correct": 5 }];
	var activeQuestionArray = [];
	$scope.quiz.selectedQuestion = {};
	$scope.questionsAttempted = questions.length - 1;

	function setQuestion () {
		$scope.questionsAttempted++;
		if ($scope.questionsAttempted == questions.length) {
			activeQuestionArray = shuffle(questions);
			$scope.questionsAttempted = 0;
		}
		$scope.quiz.selectedQuestion = activeQuestionArray[$scope.questionsAttempted];
	}
	
	$scope.isCorrect = function(answer) {
		 
		if (answer == $scope.quiz.selectedQuestion.answers[$scope.quiz.selectedQuestion.correct - 1]) {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Correct!',
			     template: $scope.quiz.selectedQuestion.question + " is <span class='right-answer'><b>" + answer + "</b></span>.",
			     buttons: [{ text: "OK", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		else {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Incorrect',
			     template: $scope.quiz.selectedQuestion.question + " is not " + answer + ".",
				     buttons: [{ text: "Try Again", type: 'button-positive'},
				               { text: "New Question", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		alertPopup;
	}
	
	setQuestion();
})


.controller('StarCtrl', function($scope, $window, $compile, $ionicPopup) {
	angular.element(window).on('resize', windowResizeHandler);
	  function windowResizeHandler( ) {
	     $scope.loadRoom();
	}
	
	$scope.star = {};
	$scope.star.rooms = [{"name": "Room 1", "room": 1, "width": 510, "height": 506, "stars": [{"id": 1, "left": 255, "top": 367}, {"id": 2, "left": 447, "top": 271}, {"id": 3, "left": 63, "top": 336}, {"id": 4, "left": 127, "top": 47}, {"id": 5, "left": 383, "top": 47}]},
	                     {"name": "Room 2", "room": 2, "width": 1021, "height": 490, "stars": [{"id": 1, "left": 801, "top": 44}, {"id": 2, "left": 801, "top": 367}, {"id": 3, "left": 545, "top": 299}, {"id": 4, "left": 161, "top": 363}, {"id": 5, "left": 289, "top": 235}, {"id": 6, "left": 97, "top": 75}]},
	                     {"name": "Room 3", "room": 3, "width": 494, "height": 490, "stars": [{"id": 1, "left": 303, "top": 395}, {"id": 2, "left": 47, "top": 395}, {"id": 3, "left": 175, "top": 267}, {"id": 4, "left": 47, "top": 11}, {"id": 5, "left": 239, "top": 107}, {"id": 6, "left": 431, "top": 139}]}];
	$scope.star.room = $scope.star.rooms[0];
	
	$scope.scale = document.getElementById("mapContainer").offsetWidth / $scope.star.room.width * 100;
	
	$scope.internalContents = "";
	
	$scope.internalContents = "";
	
	$scope.chosenFlowers = [];
	
	$scope.chooseFlower = function(id) {
		$scope.chosenFlowers.push(id);
		if ($scope.chosenFlowers.length == $scope.star.room.stars.length) {
			var correct = true;
			for (var i = 0; i < $scope.chosenFlowers.length; i++) {
				if ($scope.chosenFlowers[i] != $scope.star.room.stars[i].id) {
					correct = false;
				}
			}
			 var alertPopup = $ionicPopup.alert({
			     title: (correct ? "Correct!" : "Not Optimal"),
			     template: (correct ? "You chose the optimal path." : "See the Wiki for correct route."),
			     buttons: [{ text: "Start over", type: 'button-positive', onTap: function(e) { $scope.loadRoom();}}]
			   });
		}
	}
	
	
	$scope.loadRoom = function() {
		$scope.internalContents = "";
		var w = document.getElementById("mapContainer").offsetWidth;
		$scope.scale = document.getElementById("mapContainer").offsetWidth / $scope.star.room.width;
		
		$scope.star.room.stars.forEach(function(flower) {
			$scope.chosenFlowers = [];
			var flowerHeight = (40 * $scope.scale);
			var flowerWidth = (27 * $scope.scale);
			var flowerInternalOffsetWidth = ((50 - (27 * $scope.scale)) / 2);
			var flowerInternalOffsetHeight = ((50 - (40 * $scope.scale)) / 2);
			var flowerContainerOffsetWidth = (flower.left * $scope.scale) - flowerInternalOffsetWidth;
			var flowerContainerOffsetHeight = (flower.top * $scope.scale) - flowerInternalOffsetHeight;
			
			$scope.internalContents += "" +
				"<div style='width: 50px; height: 50px; position: absolute; left: " + flowerContainerOffsetWidth + "px; top: " + flowerContainerOffsetHeight + "px;' ng-click='chooseFlower(" + flower.id + ")'>" +
					"<div style='width: 100%; height: 100%; position: relative;'>" +
						"<div style='width: " + flowerWidth + "px; height: " + flowerHeight + "px; position: absolute; left:" + flowerInternalOffsetWidth + "px; top:" + flowerInternalOffsetHeight + "px;'>" +
							"<img ng-show='chosenFlowers.indexOf(" + flower.id + ") >= 0' src='img/starflower.png' style='width: 100%;'/>" +
						"</div>" +
					"</div>" +
				"</div>";
		})
		
	}
	
	$scope.loadRoom();
})

.controller('ItemCtrl', function($scope) {
	$scope.item = {};
	$scope.items = [{"japanese": "リフレッシュジュース", "romaji": "Rifuresshu Jūsu", "dt": "Refresh Juice", "english": "Able Juice", "type": "item", "relevant": true},
	                {"japanese": "カタクナール", "romaji": "Kataku Nāru", "dt": "Stiffen Up", "english": "Bracer", "type": "item", "relevant": false},
	                {"japanese": "どくキノコ", "romaji": "Doku Kinoko", "dt": "Poison Mushroom", "english": "Bad Mushroom", "type": "item", "relevant": true},
	                {"japanese": "ブリリアントカード", "romaji": "Buririanto Kādo", "dt": "Brilliant Card", "english": "Bright Card", "type": "item", "relevant": false},
	                {"japanese": "カルボクッキー", "romaji": "Karubo Kukkī", "dt": "Carbo Cookie", "english": "Carbo Cookie", "type": "item", "relevant": false},
	                {"japanese": "ミンナカタクナール", "romaji": "Minna Kataku Nāru", "dt": "Everyone Stiffens Up", "english": "Crystalline", "type": "item", "relevant": false},
	                {"japanese": "あのころにもどりたい", "romaji": "Anokoro ni Modoritai", "dt": "I Want to Go Back", "english": "EarlierTimes", "type": "item", "relevant": false},
	                {"japanese": "あしはえドリンク", "romaji": "Ashihae Dorinku", "dt": "Ashihae Drink", "english": "Elixir", "type": "item", "relevant": false},
	                {"japanese": "ツヨクナール", "romaji": "Tsuyoku Nāru", "dt": "Become Strong", "english": "Energizer", "type": "item", "relevant": true},
	                {"japanese": "ひりょう", "romaji": "Hiryō", "dt": "Fertilizer", "english": "Fertilizer", "type": "item", "relevant": false},
	                {"japanese": "かえんだま", "romaji": "Kaendama", "dt": "Fire Bomb", "english": "Fire Bomb", "type": "item", "relevant": true},
	                {"japanese": "はなび", "romaji": "Hanabi", "dt": "Fireworks", "english": "Fireworks", "type": "item", "relevant": false},
	                {"japanese": "フラワーギフト", "romaji": "Furawā Gifuto", "dt": "Flower Gift", "english": "Flower Box", "type": "item", "relevant": true},
	                {"japanese": "フラワーセット", "romaji": "Furawā Setto", "dt": "Flower Set", "english": "Flower Jar", "type": "item", "relevant": true},
	                {"japanese": "フラワーカプセル", "romaji": "Furawā Kapuseru", "dt": "Flower Capsule", "english": "Flower Tab", "type": "item", "relevant": true},
	                {"japanese": "リフレッシュオール", "romaji": "Rifuresshu Nāru", "dt": "Become Refreshed", "english": "Freshen Up", "type": "item", "relevant": false},
	                {"japanese": "びびりだま", "romaji": "Bibiridama", "dt": "Bibiri Bomb", "english": "Fright Bomb", "type": "item", "relevant": true},
	                {"japanese": "オタマドリンク", "romaji": "Otama Dorinku", "dt": "Otama Drink", "english": "FroggieDrink", "type": "item", "relevant": true},
	                {"japanese": "ふくぶくろ", "romaji": "Fukubukuro", "dt": "Goodie Bag", "english": "Goodie Bag", "type": "item", "relevant": true},
	                {"japanese": "ハニーシロップ", "romaji": "Hanī Shiroppu", "dt": "Honey Syrup", "english": "Honey Syrup", "type": "item", "relevant": true},
	                {"japanese": "こおりだま", "romaji": "Kōridama", "dt": "Ice Bomb", "english": "Ice Bomb", "type": "item", "relevant": true},
	                {"japanese": "ケロケロドリンク", "romaji": "Kerokero Dorinku", "dt": "Kerokero Drink", "english": "KerokeroCola", "type": "item", "relevant": true},
	                {"japanese": "ひつじのゆうわく", "romaji": "Hitsuji no Yūwaku", "dt": "Sheep's Lure", "english": "Lamb's Lure", "type": "item", "relevant": false},
	                {"japanese": "ラッキージェエル", "romaji": "Rakkī Jēru", "dt": "Lucky Jewel", "english": "Lucky Jewel", "type": "item", "relevant": false},
	                {"japanese": "おヒレちぢみドリンク", "romaji": "Ohire Chizimi Dorinku", "dt": "Ohire Chizimi Drink", "english": "Megalixir", "type": "item", "relevant": false},
	                {"japanese": "メイプルシロップ", "romaji": "Meipuru Shiroppu", "dt": "Maple Syrup", "english": "Maple Syrup", "type": "item", "relevant": true},
	                {"japanese": "ウルトラキノコ", "romaji": "Urutora Kinoko", "dt": "Ultra Mushroom", "english": "Max Mushroom", "type": "item", "relevant": false},
	                {"japanese": "スーパーキノコ", "romaji": "Sūpā Kinoko", "dt": "Super Mushroom", "english": "Mid Mushroom", "type": "item", "relevant": true},
	                {"japanese": "カビはえキノコ", "romaji": "Kabihae Kinoko", "dt": "Moldy Mushroom", "english": "Moldy Mush", "type": "item", "relevant": false},
	                {"japanese": "キノコ", "romaji": "Kinoko", "dt": "Mushroom", "english": "Mushroom", "type": "item", "relevant": true},
	                {"japanese": "ムクムクのクッキー", "romaji": "Mukumuku no Kukkī", "dt": "Mukumuku Cookie", "english": "Muku Cookie", "type": "item", "relevant": false},
	                {"japanese": "ふしぎなたまご", "romaji": "Fushigina Tamago", "dt": "Mystery Egg", "english": "Mystery Egg", "type": "item", "relevant": false},
	                {"japanese": "ふっかつドリンク", "romaji": "Fukkatsu Dorinku", "dt": "Revival Drink", "english": "Pick Me Up", "type": "item", "relevant": true},
	                {"japanese": "ミンナツヨクナール", "romaji": "Minna Tsuyoku Nāru", "dt": "Everyone Becomes Strong", "english": "Power Blast", "type": "item", "relevant": false},
	                {"japanese": "せいすい", "romaji": "Seisui", "dt": "Pure Water", "english": "Pure Water", "type": "item", "relevant": false},
	                {"japanese": "レッドヨッシーエキス", "romaji": "Reddo Yosshī Ekisu", "dt": "Red Yoshi X", "english": "Red Essence", "type": "item", "relevant": true},
	                {"japanese": "こんぺいとう", "romaji": "Konpeitō", "dt": "Rock Candy", "english": "Rock Candy", "type": "item", "relevant": true},
	                {"japanese": "くさったキノコ", "romaji": "Kusatta Kinoko", "dt": "Rotten Mushroom", "english": "Rotten Mush", "type": "item", "relevant": false},
	                {"japanese": "ロイヤルシロップ", "romaji": "Roiyaru Shiroppu", "dt": "Royal Syrup", "english": "Royal Syrup", "type": "item", "relevant": true},
	                {"japanese": "さよならはとつぜんに", "romaji": "Sayonara wa Totsuzen ni", "dt": "Sudden Goodbye", "english": "See Ya", "type": "item", "relevant": false},
	                {"japanese": "たね", "romaji": "Tane", "dt": "Seed", "english": "Seed", "type": "item", "relevant": false},
	                {"japanese": "ひつじのしょうどう", "romaji": "Hitsuji no Shōdō", "dt": "Sheep's Urge", "english": "Sheep Attack", "type": "item", "relevant": false},
	                {"japanese": "ぴかぴかいし", "romaji": "Pikapika Ishi", "dt": "Sparkling Stone", "english": "Shiny Stone", "type": "item", "relevant": false},
	                {"japanese": "ねむりだま", "romaji": "Nemuridama", "dt": "Sleepy Bomb", "english": "Sleepy Bomb", "type": "item", "relevant": true},
	                {"japanese": "スターのたまご", "romaji": "Sutā no Tamago", "dt": "Star Egg", "english": "Star Egg", "type": "item", "relevant": false},
	                {"japanese": "サイフ", "romaji": "Saifu", "dt": "Wallet", "english": "Wallet", "type": "item", "relevant": true},
	                {"japanese": "しなびたキノコ", "romaji": "Shinabita Kinoko", "dt": "Wilt Mushroom", "english": "Wilt Shroom", "type": "item", "relevant": false},
	                {"japanese": "ヨッシーエキス", "romaji": "Yosshī Ekisu", "dt": "Yoshi X", "english": "Yoshi-Ade", "type": "item", "relevant": false},
	                {"japanese": "ヨッシーキャンディー", "romaji": "Yosshī Kyandī", "dt": "Yoshi Candy", "english": "Yoshi Candy", "type": "item", "relevant": false},
	                {"japanese": "ヨッシーのクッキー", "romaji": "Yosshī no Kukkī", "dt": "Yoshi Cookie", "english": "Yoshi Cookie", "type": "item", "relevant": true}]
	
	$scope.weapons = [{"japanese": "ワンワン", "romaji": "Wanwan", "dt": "Wanwan", "english": "Chomp", "type": "item", "relevant": false},
	                  {"japanese": "ワンワンのぬけがら", "romaji": "Wanwan no Nukegara", "dt": "Wanwan Shell", "english": "Chomp Shell", "type": "item", "relevant": false},
	                  {"japanese": "シンバル", "romaji": "Shinbaru", "dt": "Cymbals", "english": "Cymbals", "type": "item", "relevant": true},
	                  {"japanese": "スーパーダブルパンチ", "romaji": "Sūpā Daburu Panchi", "dt": "Super Double Punch", "english": "Double Punch", "type": "item", "relevant": true},
	                  {"japanese": "ドリルクロー", "romaji": "Doriru Kurō", "dt": "Drill Claw", "english": "Drill Claw", "type": "item", "relevant": false},
	                  {"japanese": "フィンガーショット", "romaji": "Fingā Shotto", "dt": "Finger Shot", "english": "Finger Shot", "type": "item", "relevant": true},
	                  {"japanese": "ハンマー", "romaji": "Hanmā", "dt": "Hammer", "english": "Hammer", "type": "item", "relevant": true},
	                  {"japanese": "ハンドキャノン", "romaji": "Hando Kyanon", "dt": "Hand Cannon", "english": "Hand Cannon", "type": "item", "relevant": false},
	                  {"japanese": "ハンドガン", "romaji": "Hando Gan", "dt": "Hand Gun", "english": "Hand Gun", "type": "item", "relevant": false},
	                  {"japanese": "ぶんなげグローブ", "romaji": "Bunnage Gurōbu", "dt": "Bunnage Gloves", "english": "Hurly Gloves", "type": "item", "relevant": true},
	                  {"japanese": "ケロケロのつえ", "romaji": "Kerokero no Tsue", "dt": "Kerokero Stick", "english": "Froggie Stick", "type": "item", "relevant": false},
	                  {"japanese": "フライパン", "romaji": "Furai Pan", "dt": "Frying Pan", "english": "Frying Pan", "type": "item", "relevant": false},
	                  {"japanese": "ひまんパタこうら", "romaji": "Himan Pata Kōra", "dt": "Overweight Pata Shell", "english": "Lazy Shell", "type": "item", "relevant": false},
	                  {"japanese": "ムラっけハンマー", "romaji": "Murakke Hanmā", "dt": "Murakke Hammer", "english": "Masher", "type": "item", "relevant": false},
	                  {"japanese": "でかパンチグローブ", "romaji": "Deka Panchi Gurōbu", "dt": "Big Punch Glove", "english": "Mega Glove", "type": "item", "relevant": true},
	                  {"japanese": "ノコノコこうら", "romaji": "Nokonoko Kōra", "dt": "Nokonoko Shell", "english": "NokNok Shell", "type": "item", "relevant": false},
	                  {"japanese": "パラソル", "romaji": "Parasoru", "dt": "Parasol", "english": "Parasol", "type": "item", "relevant": false},
	                  {"japanese": "パンチグローブ", "romaji": "Panchi Gurōbu", "dt": "Punch Glove", "english": "Punch Glove", "type": "item", "relevant": true},
	                  {"japanese": "ゲコゲコのつえ", "romaji": "Gekogeko no Tsue", "dt": "Gekogeko Stick", "english": "Ribbit Stick", "type": "item", "relevant": false},
	                  {"japanese": "ビンタグローブ", "romaji": "Binta Gurōbu", "dt": "Slap Glove", "english": "Slap Glove", "type": "item", "relevant": false},
	                  {"japanese": "ソニックシンバル", "romaji": "Sonikku Shinbaru", "dt": "Sonic Cymbals", "english": "Sonic Cymbal", "type": "item", "relevant": false},
	                  {"japanese": "トゲワンワン", "romaji": "Togewanwan", "dt": "Spiked Wanwan", "english": "Spiked Link", "type": "item", "relevant": false},
	                  {"japanese": "スターガン", "romaji": "Sutā Gan", "dt": "Star Gun", "english": "Star Gun", "type": "item", "relevant": false},
	                  {"japanese": "くっつきグローブ", "romaji": "Kuttsuki Gurōbu", "dt": "Sticky Glove", "english": "Sticky Glove", "type": "item", "relevant": false},
	                  {"japanese": "スーパーハンマー", "romaji": "Sūpā Hanmā", "dt": "Super Hammer", "english": "Super Hammer", "type": "item", "relevant": false},
	                  {"japanese": "ちょービンタグローブ", "romaji": "Chō Binta Gurōbu", "dt": "Super Slap Glove", "english": "Super Slap", "type": "item", "relevant": false},
	                  {"japanese": "パタパタこうら", "romaji": "Patapata Kōra", "dt": "Patapata Shell", "english": "Troopa Shell", "type": "item", "relevant": true},
	                  {"japanese": "ウルトラハンマー", "romaji": "Urutora Hanmā", "dt": "Ultra Hammer", "english": "Ultra Hammer", "type": "item", "relevant": false},
	                  {"japanese": "センス", "romaji": "Sensu", "dt": "Folding Fan", "english": "War Fan", "type": "item", "relevant": true},
	                  {"japanese": "のびパンチグローブ", "romaji": "Nobi Panchi Gurōbu", "dt": "Stretching Punch Glove", "english": "Whomp Glove", "type": "item", "relevant": false}];
	
	$scope.equipment = [{"japanese": "むてきのこうら", "romaji": "Muteki no Kōra", "dt": "Invincible Shell", "english": "Courage Shell", "type": "item", "relevant": false},
	                    {"japanese": "ファイアマント", "romaji": "Faia Manto", "dt": "Fire Cape", "english": "Fire Cape", "type": "item", "relevant": false},
	                    {"japanese": "ファイアドレス", "romaji": "Faia Doresu", "dt": "Fire Dress", "english": "Fire Dress", "type": "item", "relevant": false},
	                    {"japanese": "ファイアパンツ", "romaji": "Faia Pantsu", "dt": "Fire Pants", "english": "Fire Pants", "type": "item", "relevant": false},
	                    {"japanese": "ファイアシェル", "romaji": "Faia Sheru", "dt": "Fire Shell", "english": "Fire Shell", "type": "item", "relevant": false},
	                    {"japanese": "ファイアつなぎ", "romaji": "Faia Tsunagi", "dt": "Fire Overalls", "english": "Fire Shirt", "type": "item", "relevant": false},
	                    {"japanese": "ふかふかマント", "romaji": "Fukafuka Manto", "dt": "Fuzzy Cape", "english": "Fuzzy Cape", "type": "item", "relevant": false},
	                    {"japanese": "ふかふかドレス", "romaji": "Fukafuka Doresu", "dt": "Fuzzy Dress", "english": "Fuzzy Dress", "type": "item", "relevant": false},
	                    {"japanese": "ふかふかパンツ", "romaji": "Fukafuka Pantsu", "dt": "Fuzzy Pants", "english": "Fuzzy Pants", "type": "item", "relevant": false},
	                    {"japanese": "ふかふかつなぎ", "romaji": "Fukafuka Tsunagi", "dt": "Fuzzy Overalls", "english": "Fuzzy Shirt", "type": "item", "relevant": false},
	                    {"japanese": "ハッピーマント", "romaji": "Happī Manto", "dt": "Happy Cape", "english": "Happy Cape", "type": "item", "relevant": false},
	                    {"japanese": "ハッピーパンツ", "romaji": "Happī Pantsu", "dt": "Happy Pants", "english": "Happy Pants", "type": "item", "relevant": false},
	                    {"japanese": "ハッピーシェル", "romaji": "Happī Sheru", "dt": "Happy Shell", "english": "Happy Shell", "type": "item", "relevant": false},
	                    {"japanese": "ハッピーつなぎ", "romaji": "Happī Tsunagi", "dt": "Happy Overalls", "english": "Happy Shirt", "type": "item", "relevant": false},
	                    {"japanese": "ヒールシェル", "romaji": "Hīru Sheru", "dt": "Heal Shell", "english": "Heal Shell", "type": "item", "relevant": false},
	                    {"japanese": "ヒーローつなぎ", "romaji": "Hīrō Tsunagi", "dt": "Hero Overalls", "english": "Hero Shirt", "type": "item", "relevant": false},
	                    {"japanese": "ひまんパタこうら", "romaji": "Himan Pata Kōra", "dt": "Overweight Pata Shell", "english": "Lazy Shell", "type": "item", "relevant": false},
	                    {"japanese": "ばっちりマント", "romaji": "Batchiri Manto", "dt": "Batchiri Cape", "english": "Mega Cape", "type": "item", "relevant": false},
	                    {"japanese": "ばっちりパンツ", "romaji": "Batchiri Pantsu", "dt": "Batchiri Pants", "english": "Mega Pants", "type": "item", "relevant": false},
	                    {"japanese": "ばっちりつなぎ", "romaji": "Batchiri Tsunagi", "dt": "Batchiri Overalls", "english": "Mega Shirt", "type": "item", "relevant": false},
	                    {"japanese": "セーラードレス", "romaji": "Sērā Doresu", "dt": "Sailor Dress", "english": "Nautica Dress", "type": "item", "relevant": false},
	                    {"japanese": "ふつうのパンツ", "romaji": "Futsū no Pantsu", "dt": "Ordinary Pants", "english": "Pants", "type": "item", "relevant": false},
	                    {"japanese": "ラブラブドレス", "romaji": "Raburabu Doresu", "dt": "Raburabu Dress", "english": "Polka Dress", "type": "item", "relevant": false},
	                    {"japanese": "プリンスパンツ", "romaji": "Purinsu Pantsu", "dt": "Prince Pants", "english": "Prince Pants", "type": "item", "relevant": false},
	                    {"japanese": "プリンセスドレス", "romaji": "Purinsesu Doresu", "dt": "Princess Dress", "english": "Royal Dress", "type": "item", "relevant": false},
	                    {"japanese": "セーラーマント", "romaji": "Sērā Manto", "dt": "Sailor Cape", "english": "Sailor Cape", "type": "item", "relevant": false},
	                    {"japanese": "セーラーパンツ", "romaji": "Sērā Pantsu", "dt": "Sailor Pants", "english": "Sailor Pants", "type": "item", "relevant": false},
	                    {"japanese": "セーラーつなぎ", "romaji": "Sērā Tsunagi", "dt": "Sailor Overalls", "english": "Sailor Shirt", "type": "item", "relevant": false},
	                    {"japanese": "ふつうのつなぎ", "romaji": "Futsū no Tsunagi", "dt": "Ordinary Overalls", "english": "Shirt", "type": "item", "relevant": true},
	                    {"japanese": "スターマント", "romaji": "Sutā Manto", "dt": "Star Cape", "english": "Star Cape", "type": "item", "relevant": false},
	                    {"japanese": "スーパージャンパー", "romaji": "Sūpā Janpā", "dt": "Super Jumper", "english": "Super Suit", "type": "item", "relevant": true},
	                    {"japanese": "しっかりパンツ", "romaji": "Shikkari Pantsu", "dt": "Tight Pants", "english": "Thick Pants", "type": "item", "relevant": false},
	                    {"japanese": "しっかりつなぎ", "romaji": "Shikkari Tsunagi", "dt": "Tight Overalls", "english": "Thick Shirt", "type": "item", "relevant": false},
	                    {"japanese": "ばっちいパンツ", "romaji": "Batchī Pantsu", "dt": "Batchi Pants", "english": "Work Pants", "type": "item", "relevant": true}];
	
	$scope.accessories = [{"japanese": "ブッキーのおまもり", "romaji": "Bukkī no Omamori", "dt": "Bukki Charm", "english": "Amulet", "type": "item", "relevant": true},
	                      {"japanese": "どくふせぎバッジ", "romaji": "Doku Fusegi Bajji", "dt": "Prevent Poison Badge", "english": "Antidote Pin", "type": "item", "relevant": false},
	                      {"japanese": "ジャンパースカーフ", "romaji": "Janpā Sukāfu", "dt": "Jumper Scarf", "english": "Attack Scarf", "type": "item", "relevant": true},
	                      {"japanese": "ラブラブリング", "romaji": "Raburabu Ringu", "dt": "Raburabu Ring", "english": "B'tub Ring", "type": "item", "relevant": false},
	                      {"japanese": "かがやけるひのために", "romaji": "Kagayakeruhi no Tame ni", "dt": "Kagayakeruhi no Tame ni", "english": "Coin Trick", "type": "item", "relevant": false},
	                      {"japanese": "あなたをこえたくて", "romaji": "Anata o Koetakute", "dt": "Anata o Koetakute", "english": "Exp. Booster", "type": "item", "relevant": true},
	                      {"japanese": "ドドのはね", "romaji": "Dodo no Hane", "dt": "Dodo Feather", "english": "Feather", "type": "item", "relevant": true},
	                      {"japanese": "きょうふふせぎバッジ", "romaji": "Kyoufu Fusegi Bajji", "dt": "Prevent Fear Badge", "english": "Fearless Pin", "type": "item", "relevant": false},
	                      {"japanese": "ゆうれいくんしょう", "romaji": "Yūrekunshō", "dt": "Ghost Medal", "english": "Ghost Medal", "type": "item", "relevant": false},
	                      {"japanese": "ジャッキーベルト", "romaji": "Jakkī Beruto", "dt": "Jackie Belt", "english": "Jinx Belt", "type": "item", "relevant": false},
	                      {"japanese": "かいてんシューズ", "romaji": "Kaiten Shūzu", "dt": "Turning Shoes", "english": "Jump Shoes", "type": "item", "relevant": true},
	                      {"japanese": "クリスタルのおまもり", "romaji": "Kurisutaru no Omamori", "dt": "Crystal Charm", "english": "Quartz Charm", "type": "item", "relevant": false},
	                      {"japanese": "ぼうぎょスカーフ", "romaji": "Bōgyo Sukāfu", "dt": "Defense Scarf", "english": "Rare Scarf", "type": "item", "relevant": false},
	                      {"japanese": "あんしんバッジ", "romaji": "Anshin Bajji", "dt": "Safety Badge", "english": "Safety Badge", "type": "item", "relevant": false},
	                      {"japanese": "セーフティーリング", "romaji": "Sēfutī Ringu", "dt": "Safety Ring", "english": "Safety Ring", "type": "item", "relevant": true},
	                      {"japanese": "きみがいてくれたから", "romaji": "Kimi ga Itekuretakara", "dt": "Kimi ga Itekuretakara", "english": "Scrooge Ring", "type": "item", "relevant": false},
	                      {"japanese": "おしらせリング", "romaji": "Oshirase Ringu", "dt": "Signal Ring", "english": "Signal Ring", "type": "item", "relevant": false},
	                      {"japanese": "パタパタくんしょう", "romaji": "Patapata Kunshō", "dt": "Patapata Medal", "english": "Troopa Pin", "type": "item", "relevant": true},
	                      {"japanese": "へんしんふせぎバッジ", "romaji": "Henshin Fusegi Bajji", "dt": "Prevent Transformation Badge", "english": "Trueform Pin", "type": "item", "relevant": false},
	                      {"japanese": "ぼんやりふせぎバッジ", "romaji": "Bon'yari Fusegi Bajji", "dt": "Prevent Absent-Mindedness Badge", "english": "Wake Up Pin", "type": "item", "relevant": true},
	                      {"japanese": "シュビビンシューズ", "romaji": "Shubibin Shūzu", "dt": "Shubibin Shoes", "english": "Zoom Shoes", "type": "item", "relevant": true}];
	
	$scope.items.sort(function(a,b) {
		return a.english.toLowerCase().localeCompare(b.english.toLowerCase());
	})
	$scope.weapons.sort(function(a,b) {
		return a.english.toLowerCase().localeCompare(b.english.toLowerCase());
	})
	$scope.equipment.sort(function(a,b) {
		return a.english.toLowerCase().localeCompare(b.english.toLowerCase());
	})
	$scope.accessories.sort(function(a,b) {
		return a.english.toLowerCase().localeCompare(b.english.toLowerCase());
	})
})

.controller('CoinCtrl', function($scope, $timeout, $ionicPopup) {
	
	$scope.reset = function() {
		$scope.marioSlideRight = false;
		$scope.marioJump = false;
		$scope.marioFall = false;
		$scope.marioSlideLeft = false;
		
		$scope.topperSlideRight = false;
		$scope.topperJump = false;
		$scope.topperFall = false;
		$scope.topperSlideLeft = false;
		
		$scope.boxOpen = false;
		
		$scope.canJump = false;
		$scope.canRetreat = false;

		$scope.thisTurnJumps = 0;

		$scope.coinsTaken = 0;
		
		$timeout(function() {
				$scope.marioSlideRight = true;
				$timeout(function() {
					$scope.canJump = true;
					$scope.setHint();
			}, 1000);
		}, 500);
		
		$scope.coinsTakenMsg = "Taken: " + $scope.coinsTaken + ", Remaining: " + (21 - $scope.coinsTaken);
		
		
	}
	
	$scope.setHint = function(param) {
		if (param == null) {
			if ($scope.coinsTaken == 0) {
				$scope.thisHint = "Take 4 coins, and hope Dr. Topper takes more than 1."
			}
			else if ($scope.coinsTaken % 5 == 0) {
				$scope.thisHint = "Take 4 coins, and hope Dr. Topper takes more than 1 on his next turn."
			}
			else {
				$scope.thisHint = "Take " + (5 - ($scope.coinsTaken % 5)) + " coin" + (5 - ($scope.coinsTaken % 5) > 1 ? "s" : "") + ". when possible, always take enough to set the total to a multiple of 5, and then retreat. That way you will get the 20th coin, and he will get the 21st.";		
			}
		}
		else {
			$scope.thisHint = param;
		}
	}
	
	$scope.reset();
	
	$scope.jump = function() {
		$scope.canRetreat = false;
		$scope.canJump = false;
		$scope.marioJump = true;
		$scope.thisTurnJumps++;
		$scope.coinsTaken++;
		$scope.coinsTakenMsg = "Taken: " + $scope.coinsTaken + ", Remaining: " + (21 - $scope.coinsTaken);
		$timeout(function() {
			$scope.boxOpen = true;
			$timeout(function() {
				$scope.boxOpen = false;
			},300);
		},150);
		$timeout(function() {
			$scope.marioFall = true;
			$scope.marioJump = false;
			$timeout(function() {
				$scope.marioFall = false;
				$scope.marioJump = false;
				if ($scope.coinsTaken == 21) {
					 var alertPopup = $ionicPopup.alert({
					     title: 'You Lose',
					     template: "You took the 21st coin.",
					     buttons: [{ text: "Start over", type: 'button-positive', onTap: function(e) { $scope.reset();}}]
					   });
				}
					else {
					if ($scope.thisTurnJumps < 4)
						$scope.canJump = true;
					if ($scope.thisTurnJumps > 0)
						$scope.canRetreat = true;
				}
			},150);
		},150);
	}
	
	$scope.retreat = function() {
		$scope.setHint("");
		$scope.canRetreat = false;
		$scope.marioSlideLeft = true;
		$scope.marioSlideRight = false;
		$scope.canJump = false;
		$scope.thisTurnJumps = 0;
		$timeout(function() {
			$scope.marioSlideLeft = false;
			$scope.topperanim();
		}, 1000);
	}
	
	$scope.topperanim = function() {
		$scope.topperSlideLeft = true;
		var topperJumps = Math.ceil(Math.random() * 4);
		var topperJumpsTaken = 0;
		$timeout(function() {
			topperJump();
		}, 1000);
		function topperJump() {
			topperJumpsTaken++;
			$scope.topperJump = true;
			$scope.coinsTaken++;
			$scope.coinsTakenMsg = "Taken: " + $scope.coinsTaken + ", Remaining: " + (21 - $scope.coinsTaken);
			$timeout(function() {
				$scope.boxOpen = true;
				$timeout(function() {
					$scope.boxOpen = false;
				},300);
			},150);
			$timeout(function() {
				$scope.topperFall = true;
				$scope.topperJump = false;
				$timeout(function() {
					$scope.topperFall = false;
					if ($scope.coinsTaken == 21) {
						 var alertPopup = $ionicPopup.alert({
						     title: 'You win!',
						     template: "Dr. Topper took the 21st coin.",
						     buttons: [{ text: "Start over", type: 'button-positive', onTap: function(e) { $scope.reset();}}]
						   });
					}
					else {
						if (topperJumpsTaken < topperJumps) {
							$timeout(function() {
								topperJump();
							}, 250);
						}
						else {
							$timeout(function() {
								$scope.topperSlideRight = true;
								$scope.topperSlideLeft = false;
								$timeout(function() {
									$scope.topperSlideRight = false;
									
									$timeout(function() {
											$scope.marioSlideRight = true;
											$timeout(function() {
												$scope.setHint();
												$scope.canJump = true;
										}, 1000);
									}, 500);
								}, 1000);
							}, 250);
						}
					}
				},150);
			},150);
		}
	}
})
.controller('SolitaireCtrl', function($scope, $ionicPopup) {
	$scope.balls = [{"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": false, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
	                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"}
	                ];
	
	var moveCounter = 0;
	
	var moves = [{"from":10, "to": 2},
	                {"from":4, "to": 6},
	                {"from":12, "to": 4},
	                {"from":13, "to": 5},
	                {"from":1, "to": 9},
	                {"from":3, "to": 1},
	                {"from":7, "to": 5},
	                {"from":15, "to": 13},
	                {"from":0, "to": 2},
	                {"from":4, "to": 6},
	                {"from":13, "to": 5},
	                {"from":5, "to": 7},
	                {"from":11, "to": 3},
	                {"from":3, "to": 1},
	                
	                ];
	
	$scope.hint = function() {
		angular.forEach($scope.balls, function(ball) {
			ball.hintStyle = "none";
		})
		if ($scope.solitaire.hints && $scope.hintsAvailable) {
			$scope.balls[moves[moveCounter].to].hintStyle = "hint-to";
			$scope.balls[moves[moveCounter].from].hintStyle = "hint-from";
		}
	}
	
	function setHeight() {
		document.getElementById("ballContainer").style.height = document.getElementById("ballContainer").offsetWidth / 2 + "px";
	}
	
	$scope.onDrag = function(event) {
		event.preventDefault();
		if (event.target.parentNode.id == "ballContainer") {
			$scope.targetMove = parseInt(event.target.id.match(/\d+/)[0]);
		}
		else {
			$scope.targetMove = parseInt(event.target.parentNode.id.match(/\d+/)[0]);
		}
		document.getElementById("ball_" + $scope.targetMove).style.top= ($scope.balls[$scope.targetMove].y + event.gesture.deltaY) + "px";
		document.getElementById("ball_" + $scope.targetMove).style.left= ($scope.balls[$scope.targetMove].x + event.gesture.deltaX) + "px";
	}
	
	$scope.onRelease = function(event) {
		event.preventDefault();
		document.getElementById("ball_" + $scope.targetMove).style.top= ($scope.balls[$scope.targetMove].y) + "px";
		document.getElementById("ball_" + $scope.targetMove).style.left= ($scope.balls[$scope.targetMove].x) + "px";
		var ballIndex = $scope.targetMove;
		var targetIndex = -1;
		var betweenIndex = -1;
		
		if (event.gesture.distance >= 50) {
			if (event.gesture.angle > 0 && event.gesture.angle < 60) {
				targetIndex = ballIndex + 2;
				betweenIndex = ballIndex + 1;
			}
			else if (event.gesture.angle > 120 && event.gesture.angle < 180) {
				targetIndex = ballIndex + 8;
				betweenIndex = ballIndex + 4;
			}
			else if (event.gesture.angle > -180 && event.gesture.angle < -120) {
				targetIndex = ballIndex - 2;
				betweenIndex = ballIndex - 1;
			}
			else if (event.gesture.angle > -60 && event.gesture.angle < 0) {
				targetIndex = ballIndex - 8;
				betweenIndex = ballIndex - 4;
			}
		}
		
		if (targetIndex > 15 || targetIndex < 0) {
		}
		else {
			if ($scope.balls[targetIndex].ball == false && $scope.balls[ballIndex].ball && $scope.balls[betweenIndex].ball) {
				$scope.balls[targetIndex].ball = true;
				$scope.balls[ballIndex].ball = false;
				$scope.balls[betweenIndex].ball = false;
				if (moves[moveCounter].from == ballIndex && moves[moveCounter].to == targetIndex && $scope.hintsAvailable) {
				}
				else {
					$scope.hintsAvailable = false;
				}
				moveCounter++;
				var checkWin = $scope.balls.filter(function(a) {
					return (a.ball == true);
				});
				if (checkWin.length == 1) {
					 var alertPopup = $ionicPopup.alert({
					     title: 'You win!',
					     buttons: [{ text: "Start over", type: 'button-positive', onTap: function(e) { $scope.reset();}}]
					   });
				}
				$scope.hint();
			}
		}
	}
	
	$scope.reset = function() {

		$scope.targetMove = 0;
		$scope.targetDrop = {};
		moveCounter = 0;
		$scope.balls = [{"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": false, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"},
		                {"ball": true, "x": 0, "y": 0, "hintStyle":"none"}
		                ];
		
		generateGrid();
		

		$scope.solitaire = {};
		
		$scope.hintsAvailable = true;
		$scope.hint();
	}
	
	function generateGrid() {
		setHeight();
		var dx = 90 / 6;
		var dy = dx;
		var baseX = dx * 3;
		var baseY = 0;
		for (var i = 0; i < $scope.balls.length; i++) {
			var j = i % 4;
			if (i % 4 == 0 && i > 0) {
				baseX -= dx;
				baseY += dy;
			}
			$scope.balls[i].x = 10 + (baseX + dx * j) * document.getElementById("ballContainer").offsetWidth / 100;
			$scope.balls[i].y = (baseY + dy * j) * document.getElementById("ballContainer").offsetWidth / 200;
		}
	}
	$scope.reset();
	
	reset = function() {
		$scope.balls = [[true, true, false, true],[true, true, true, true],[true, true, true, true],[true,true,true,true]];
	}
})
.controller('MarathonCtrl', function($scope, $ionicPopup) {
	$scope.marathon = {};
	var animals = [{"name":"テレボー", "name_eng":"Boo"}, {"name":"クリタ", "name_eng":"Goo"}, {"name":"プックン","name_eng":"Kipp"}, {"name":"カロリン","name_eng":"Bones"}];
	var places = [{"place": 1, "string":"じてんしゃで＿#2＿をぬいて、<br>そのあとはゴールまで＿#2＿には<br>ぬかれてないよ。", "english": "I outrode [homeboy] on my bike, and [homeboy] was never able to pass me!"},
	              {"place": 2, "string":"じてんしゃでちょうしが悪くて<br>４いにおちちゃったけど、けっきょく<br>すいえいと同じじゅんいでゴールできた。", "english":"I fell into 4th place during the bike race, but finally ended up in the same place as I did in the swimming event."},
					{"place": 3, "string":"すいえいも　じてんしゃも<br>じゅんいは同じだったけど、マラソンで<br>ふたりにぬかれちゃった。", "english": "I placed the same in the swimming and cycling events, but 2 others beat me in the marathon."},
					{"place": 4, "string":"すいえいで３いだったけど、<br>ゴールするまで３いより上になったことは<br>なかったよ。　ちぇ。", "english": "I came in 3rd for swimming..."}];
	
	
	refreshMarathon = function() {
		
		$scope.animalOrder = [];
		
		var ao = shuffle(animals);
		var pcs = shuffle(places);
		for (var i = 0; i < 4; i++) {
			$scope.animalOrder.push({"name": ao[i].name, "name_eng": ao[i].name_eng, "place": pcs[i].place, "string": pcs[i].string, "english": pcs[i].english});
			
		}
		var first = $scope.animalOrder.filter(function(o) {
			return (o.place == 1);
		});
		var second = $scope.animalOrder.filter(function(o) {
			return (o.place == 2);
		});
		$scope.animalOrder[$scope.animalOrder.indexOf(first[0])].string = $scope.animalOrder[$scope.animalOrder.indexOf(first[0])].string.replace(/＿#2＿/g, second[0].name);
		$scope.animalOrder[$scope.animalOrder.indexOf(first[0])].english = $scope.animalOrder[$scope.animalOrder.indexOf(first[0])].english.replace(/\[homeboy\]/g, second[0].name_eng);
	}
	
	refreshMarathon();
	$scope.getMessage = function(char) {
		var c = $scope.animalOrder.filter(function(o) {
			return (o.name_eng == char);
		})
		var alertPopup = $ionicPopup.alert({
			title: c[0].name + ($scope.marathon.hints ? " (" + c[0].name_eng + ")" : ""),
			template: c[0].string + ($scope.marathon.hints ? "<br>" + c[0].english : ""),
			buttons: [{ text: "OK", type: 'button-positive'}]
		});
		
	}
	  
	  $scope.moveItem = function(item, fromIndex, toIndex) {
		  $scope.animalOrder.splice(fromIndex, 1);
		  $scope.animalOrder.splice(toIndex, 0, item);
	  };
	  
	  $scope.validateAnimals = function() {
		  var good = true;
		  var yourStr = "";
		  var yourStrEn = "";
		  for (var i = 0; i < $scope.animalOrder.length; i++) {
			  yourStr += $scope.animalOrder[i].name + (i == 3 ? "" : "/");
			  yourStrEn += $scope.animalOrder[i].name_eng + (i == 3 ? "" : "/");
			  if (i + 1 != $scope.animalOrder[i].place) {
				  good = false;
			  }
		  }
		  if (good) {
				 var alertPopup = $ionicPopup.alert({
				     title: 'Correct!',
				     template: yourStr + " (" + yourStrEn + ") is the correct order.",
				     buttons: [{ text: "Start over", type: 'button-positive'}]
				   });
			}
			else {
				var x = [];
				  for (var i = 0; i < $scope.animalOrder.length; i++) {
					  x.push($scope.animalOrder[i]);
				  }
				x.sort(function(a,b) {
					return (a.place - b.place);
				})
				  var correctStr = "";
				  var correctStrEn = "";
				  for (var i = 0; i < x.length; i++) {
					  correctStr += x[i].name + (i == 3 ? "" : "/");
					  correctStrEn += x[i].name_eng + (i == 3 ? "" : "/");
				  }
				 var alertPopup = $ionicPopup.alert({
				     title: 'Incorrect',
				     template: "Your answer was " + yourStr + " (" + yourStrEn + "), but the correct order is " + correctStr + " (" + correctStrEn + ").",
				     buttons: [{ text: "Start over", type: 'button-positive'}]
				   });
			}
			   alertPopup.then(function(res) {
				   refreshMarathon();
				   });
	  }
})

.controller('QuizCtrl', function($scope, $ionicPopup) {
	
	$scope.quiz = {};
	var questions = [
	                {
	                	"question": {"japanese": "メニューがめんの<br>上から４番目のこうもくは？",
	                				"romaji": "Menyū gamen no<br>ue kara 4-banme no kōmoku wa?",
	                				"english": "The fourth item from the top of the menu screen?"},
	                	"answers":[{"japanese": "だいじなもの", "romaji": "Daijina mono", "english": "Special item"},
	                	           {"japanese": "スペシャル", "romaji": "Supesharu", "english": "Special"},
	                	           {"japanese": "そうび", "romaji": "Sō bi", "english": "Equip"}],
	                	"correct": 3,
	                	"qimage": "1q.png",
	                	"aimage": "1a.png"
	                },
	                {
	                	"question": {"japanese": "ばくだん作りで有名なペパット、<br>彼のくちぐせは？",
	                				"romaji": "Bakudan-tsukuri de yūmeina papetto,<br>kare no kuchiguse wa?",
	                				"english": "Punchinello's favourite phrase?"},
	                	"answers":[{"japanese": "ガス	", "romaji": "Gasu", "english": "Gas"},
	                	           {"japanese": "なのよね", "romaji": "Nanoyone", "english": "?"},
	                	           {"japanese": "ゲス", "romaji": "Gesu", "english": "GUESS"}],
	                	"correct": 3,
	                	"qimage": "2q.png",
	                	"aimage": "2a.png"
	                },
	                {
	                	"question": {"japanese": "「サージェント・パター」の、<br>「サージェント」の意味は？",
	                				"romaji": "\"Sājento patā\" no,<br>\"sājento\" no imi wa?",
	                				"english": "What does \"Sajento\" mean in \"Sajento Troopa\"'s name?"},
	                	"answers":[{"japanese": "ぐんそう", "romaji": "Gunsō", "english": "Sergeant"},
	                	           {"japanese": "しょうい", "romaji": "Shōi", "english": "Second lieutenant"},
	                	           {"japanese": "たいさ", "romaji": "Taisa", "english": "Great difference"}],
	                	"correct": 1,
	                	"qimage": "3q.png",
	                	"aimage": "3a.png"
	                },
	                {
	                	"question": {"japanese": "カエルコインで買えるアイテム、<br>「あのころにもどりたい」<br>さて、そのこうかは？",
	                				"romaji": "Kaerukoin de kaeru aitemu,\"a no koro ni modoritai\" sate, sono Kōka wa?",
	                				"english": "What is the effect of the frog coin item \"EarlierTimes\"?"},
	                	"answers":[{"japanese": "ゲームをリセットしてしまう", "romaji": "Gēmu o risetto shite shimau", "english": "Resets the game"},
	                	           {"japanese": "カエルがおたまじゃくしにもどれる", "romaji": "Kaeru ga otamajakushi ni modoreru", "english": "Makes frogs revert to tadpoles"},
	                	           {"japanese": "バトルを始めからやりなおせる", "romaji": "Batoru o hajime kara yarinaosu", "english": "Restarts the battle"}],
	                	"correct": 3,
	                	"qimage": "4q.png",
	                	"aimage": "4a.png"
	                },
	                {
	                	"question": {"japanese": "キノコ城下町宿屋の息子のもっている<br>ゲームのきしゅは？",
	                				"romaji": "Kinoko jōkamachi yadoya no musuko no motte iru<br>gēmu no kishi ~yuha?",
	                				"english": "What game console is the boy in Mushroom Kingdom Inn playing?"},
	                	"answers":[{"japanese": "ゲームボーイ", "romaji": "Gēmubōi", "english": "Game Boy"},
	                	           {"japanese": "バーチャルボーイ", "romaji": "Bācharubōi", "english": "Virtual Boy"},
	                	           {"japanese": "ディスクシステムと3Dスコープ", "romaji": "Disuku shisutemu to 3D sukōpu", "english": "Disk system and 3D scope"}],
	                	"correct": 1,
	                	"qimage": "5q.png",
	                	"aimage": "5a.png"
	                },
	                {
	                	"question": {"japanese": "たこつぼゲッソーの部屋に入るための<br>パスワードはどれ？",
	                				"romaji": "Takotsu bo gessō no heya ni hairu tame no<br>pasuwādo wa dore?",
	                				"english": "Which password lets you enter the squid room?"},
	                	"answers":[{"japanese": "かいぞくせん", "romaji": "Kaizokusen", "english": "Pirate ship"},
	                	           {"japanese": "すいぞくかん", "romaji": "Suizokukan", "english": "Aquarium"},
	                	           {"japanese": "かんけつせん", "romaji": "Kanketsusen", "english": "Geyser"}],
	                	"correct": 2,
	                	"qimage": "6q.png",
	                	"aimage": "6a.png"
	                },
	                {
	                	"question": {"japanese": "ブッキーのきかんしゃの名前は？",
	                				"romaji": "Bukkī no kikan sha no namae wa?",
	                				"english": "What is the name of Booster's train?"},
	                	"answers":[{"japanese": "ボキ69", "romaji": "Boki69", "english": "Boki69"},
	                	           {"japanese": "ブキ96", "romaji": "Buki96", "english": "Buki96"},
	                	           {"japanese": "ボキ96", "romaji": "Boki96", "english": "Boki90"}],
	                	"correct": 2,
	                	"qimage": "7q.png",
	                	"aimage": "7a.png"
	                },
	                {
	                	"question": {"japanese": "ヘイホーのもっている武器は？",
	                				"romaji": "Heihō no motte iru buki wa?",
	                				"english": "What weapon does Shy Guy have?"},
	                	"answers":[{"japanese": "しこみ杖", "romaji": "Shikomi tsue", "english": "Ninja sword"},
	                	           {"japanese": "メンコ", "romaji": "Menko", "english": "Cards"},
	                	           {"japanese": "パチンコ", "romaji": "Pachinko", "english": "Pachinko ball"}],
	                	"correct": 3,
	                	"qimage": "8q.png",
	                	"aimage": "8a.png"
	                },
	                {
	                	"question": {"japanese": "カントリーロードーにあるガケを<br>登らせてくれたのは？",
	                				"romaji": "Kantorīrōdō ni aru gake o<br>nobora sete kureta no wa?",
	                				"english": "Who helped you climb the cliff at Country Road (Land's End)?"},
	                	"answers":[{"japanese": "パタパタ隊", "romaji": "Patapata-tai", "english": "Patapata Troopas"},
	                	           {"japanese": "パタタ隊", "romaji": "Patata-tai", "english": "Patata Troopas"},
	                	           {"japanese": "パタパ隊", "romaji": "Patapa-tai", "english": "Patapa Troopas"}],
	                	"correct": 3,
	                	"qimage": "9q.png",
	                	"aimage": "9a.png"
	                },
	                {
	                	"question": {"japanese": "クッパがレベル１５で覚える技は？",
	                				"romaji": "Kuppa ga reberu 15 de oboeru waza wa?",
	                				"english": "What skill does Bowser learn at level 15?"},
	                	"answers":[{"japanese": "ふきだせドドーン", "romaji": "Fukidase dodōn", "english": "Fukidase Kaboom"},
	                	           {"japanese": "つきでろボボーン", "romaji": "Tsukidero bobōn", "english": "Crusher"},
	                	           {"japanese": "あつまれヨンドン", "romaji": "Atsumare yondon", "english": "Atsumare Yeongdong"}],
	                	"correct": 2,
	                	"qimage": "10q.png",
	                	"aimage": "10a.png"
	                },
	                {
	                	"question": {"japanese": "ノコヤンの先生の名前は？",
	                				"romaji": "Nokoyan no sensei no namae wa?",
	                				"english": "What is the name of Jagger's sensei?"},
	                	"answers":[{"japanese": "ジェフリー", "romaji": "Jefurī", "english": "Jeffrey"},
	                	           {"japanese": "ジャッキー", "romaji": "Jakkī", "english": "Jinx"},
	                	           {"japanese": "ジョナサン", "romaji": "Jonasan", "english": "Jonathan"}],
	                	"correct": 2,
	                	"qimage": "11q.png",
	                	"aimage": "11a.png"
	                },
	                {
	                	"question": {"japanese": "雲にのったモンスター　ジュゲム、<br>投げてくるものは？",
	                				"romaji": "Kumo ni notta monsutā jugemu,<br>nagete kuru mono wa?",
	                				"english": "What does Lakitu throw to you from the clouds?"},
	                	"answers":[{"japanese": "トゲへい", "romaji": "Togehei", "english": "Spinies"},
	                	           {"japanese": "やりへい", "romaji": "Yarihei", "english": "Spearmen"},
	                	           {"japanese": "なみへい", "romaji": "Namihei", "english": "Namihei"}],
	                	"correct": 1,
	                	"qimage": "12q.png",
	                	"aimage": "12a.png"
	                },
	                {
	                	"question": {"japanese": "最初のスターピースは、どこで手に入れた？",
	                				"romaji": "Saisho no sutāpīsu wa, doko de teniireta?",
	                				"english": "Where did you get the first Star Piece?"},
	                	"answers":[{"japanese": "クッパ城", "romaji": "Kuppa-jō", "english": "Bowser's Keep"},
	                	           {"japanese": "ハナチャンの森", "romaji": "Hanachan no mori", "english": "Forezt Maze"},
	                	           {"japanese": "キノコ城", "romaji": "Kinoko-jō", "english": "Mushroom Kingdom"}],
	                	"correct": 3,
	                	"qimage": "13q.png",
	                	"aimage": "13a.png"
	                },
	                {
	                	"question": {"japanese": "星ふる丘にいた、変らしいモンスターは？",
	                				"romaji": "Hoshifuruoka ni ita, henrashī monsutā wa?",
	                				"english": "What strange monster is on Star Hill?"},
	                	"answers":[{"japanese": "モコモコ", "romaji": "Mokomoko", "english": "Mokomoko"},
	                	           {"japanese": "ニョキニョキ", "romaji": "Nyokinyoki", "english": "Nyokinyoki"},
	                	           {"japanese": "ムクムク", "romaji": "Mukumuku", "english": "Mukumuku"}],
	                	"correct": 3,
	                	"qimage": "14q.png",
	                	"aimage": "14a.png"
	                },
	                {
	                	"question": {"japanese": "レベルアップボーナス画面で<br>おどっている花はいくつ？",
	                				"romaji": "Reberuappubōnasu gamen de<br>odotte iru hana wa ikutsu?",
	                				"english": "At level up bonus screen, how many dancing flowers?"},
	                	"answers":[{"japanese": "パンジー", "romaji": "Panjī", "english": "Pansy"},
	                	           {"japanese": "4つ", "romaji": "4", "english": "4"},
	                	           {"japanese": "3つ", "romaji": "3", "english": "3"}],
	                	"correct": 2,
	                	"qimage": "15q.png",
	                	"aimage": "15a.png"
	                },
	                {
	                	"question": {"japanese": "マシュマロの国のちょうこくかといえば？",
	                				"romaji": "Mashumaro no kuni nochi ~youkokukatoieba?",
	                				"english": "Who is the sculptor in Nimbus Land?"},
	                	"answers":[{"japanese": "ガロ", "romaji": "Garo", "english": "Garro"},
	                	           {"japanese": "バロ", "romaji": "Baro", "english": "Baro"},
	                	           {"japanese": "ガオウ", "romaji": "Gaō", "english": "Gaou"}],
	                	"correct": 1,
	                	"qimage": "16q.png",
	                	"aimage": "16a.png"
	                },
	                {
	                	"question": {"japanese": "オノレンジャーのリーダーは？",
	                				"romaji": "Onorenjā no rīdā wa?",
	                				"english": "Who is the leader of the Axem Rangers?"},
	                	"answers":[{"japanese": "レッド", "romaji": "Reddo", "english": "Red"},
	                	           {"japanese": "ブラック", "romaji": "Burakku", "english": "Black"},
	                	           {"japanese": "ピンク", "romaji": "Pinku", "english": "Pink"}],
	                	"correct": 1,
	                	"qimage": "17q.png",
	                	"aimage": "17a.png"
	                },
	                {
	                	"question": {"japanese": "出世に命をかける、<br>ヤリのすがたをしたボスの名前は？",
	                				"romaji": "Shusse ni inochiwokakeru,<br>Yari no sugata o shita bosu no namae wa?",
	                				"english": "The name of the boss shaped like a spear?"},
	                	"answers":[{"japanese": "ヤリドヴィッヒ", "romaji": "Yaridovu~ihhi", "english": "Yaridovich"},
	                	           {"japanese": "ヤリドヴィッチ", "romaji": "Yaridovu~itchi", "english": "Yaridovitchi"},
	                	           {"japanese": "ヤリヤリダンサー", "romaji": "Yariyaridansā", "english": "Jari Jari dancer"}],
	                	"correct": 1,
	                	"qimage": "18q.png",
	                	"aimage": "18a.png"
	                },
	                {
	                	"question": {"japanese": "とうぞくクロコの子分は何人いた？",
	                				"romaji": "Tō zo ku Kuroko no kobun wa nanijin ita?",
	                				"english": "How many henchmen does Croco have?"},
	                	"answers":[{"japanese": "2人", "romaji": "2 ri", "english": "2"},
	                	           {"japanese": "3人", "romaji": "3 ri", "english": "3"},
	                	           {"japanese": "4人", "romaji": "4 ri", "english": "4"}],
	                	"correct": 2,
	                	"qimage": "19q.png",
	                	"aimage": "19a.png"
	                },
	                {
	                	"question": {"japanese": "世界せいふくをねらうタコロン、<br>彼がぶらさがっているものは？",
	                				"romaji": "Sekai seifuku o nerau takoron,<br>kare ga burasagatte iru mono wa?",
	                				"english": "(something about Octolot and world domination)"},
	                	"answers":[{"japanese": "ふつうのパタパタ", "romaji": "Futsū no patapata", "english": "Regular koopas"},
	                	           {"japanese": "こうもりパタパタ", "romaji": "Kōmori patapata", "english": "Flying koopas"},
	                	           {"japanese": "ぶらさがりけんこう器具バタバタ", "romaji": "Burasagari kenkō kigu batabata", "english": "(something about health equipment)"}],
	                	"correct": 2,
	                	"qimage": "20q.png",
	                	"aimage": "20a.png"
	                },
	                {
	                	"question": {"japanese": "マロが、カエル仙人から<br>たのまれた　おつかいの品は？",
	                				"romaji": "Maro ga, kaeru sen'nin kara<br>tanoma reta otsukai no shina wa?",
	                				"english": "What did Frogfucius ask Mallow to get him?"},
        	                	"answers":[{"japanese": "かぶとせんべい", "romaji": "Kabuto senbei", "english": "Kabuto crackers"},
        	                	           {"japanese": "コオロギせんべい", "romaji": "Kōrogi senbei", "english": "Cricket crackers"},
        	                	           {"japanese": "オオシオカラトンボもなか", "romaji": "Ōshiokaratonbo mo naka", "english": "Dragonfly"}],
	                	"correct": 2,
	                	"qimage": "21q.png",
	                	"aimage": "21a.png"
	                },
	                {
	                	"question": {"japanese": "たまごモンスターキャサリン、<br>必ず言うセリフは？",
	                				"romaji": "Tama go monsutākyasarin,<br>kanarazu iu serifu wa?",
	                				"english": "What does Catherine (Birdo) say?"},
        	                	"answers":[{"japanese": "キャリーってよんで！", "romaji": "Kyarī tte yonde!", "english": "Call me Carrie!"},
        	                	           {"japanese": "キャシーってよんで！", "romaji": "Kyashī tte yonde!", "english": "Call me Cathy!"},
        	                	           {"japanese": "キャット空中３回転だなス", "romaji": "Kyatto kūchū 3 kaitenda na su", "english": "(something about cats)"}],
	                	"correct": 2,
	                	"qimage": "22q.png",
	                	"aimage": "22a.png"
	                },
	                {
	                	"question": {"japanese": "かいぞくジョナサンの飲んでいたのは？",
	                				"romaji": "Kai zo ku Jonasan no nonde ita no wa?",
	                				"english": "What was Johnny Jones drinking?"},
        	                	"answers":[{"japanese": "グレープジュース", "romaji": "Gurēpujūsu", "english": "Grape juice"},
        	                	           {"japanese": "ワイン", "romaji": "Wain", "english": "Wine"},
        	                	           {"japanese": "海水", "romaji": "Kaisui", "english": "Sea water"}],
	                	"correct": 1,
	                	"qimage": "23q.png",
	                	"aimage": "23a.png"
	                },
	                {
	                	"question": {"japanese": "ようかいベロ～ムがきらいな鳥は？",
	                				"romaji": "Yōkai bero~mu ga kiraina tori wa?",
	                				"english": "What bird does Belome mention before turning you into a scarecrow?"},
        	                	"answers":[{"japanese": "すずめ", "romaji": "Suzume", "english": "Sparrow"},
        	                	           {"japanese": "うずら", "romaji": "Uzura", "english": "Quail"},
        	                	           {"japanese": "オガサワラオオコウモリ", "romaji": "Ogasawaraookoumori", "english": "Flying fox"}],
	                	"correct": 1,
	                	"qimage": "24q.png",
	                	"aimage": "24a.png"
	                },
	                {
	                	"question": {"japanese": "ピーチ姫がクッパにさらわれた時、<br>ピーチ姫はなにをしていたところだった？",
	                				"romaji": "Pīchi hime ga kuppa ni sarawa reta toki,<br>pīchi hime wa nani o shite ita tokorodatta?",
	                				"english": "What was Toadstool doing when she was kidnapped by Bowser?"},
        	                	"answers":[{"japanese": "むすんでひらいてをしていた", "romaji": "Musunde hiraite o shite ita", "english": "She was tying her shoes"},
        	                	           {"japanese": "花をつんでいた", "romaji": "Hana o tsunde ita", "english": "She was picking flowers"},
        	                	           {"japanese": "いねをうえていた", "romaji": "Ine o uete ita", "english": "She was planting rice"}],
	                	"correct": 2,
	                	"qimage": "25q.png",
	                	"aimage": "25a.png"
	                },
	                {
	                	"question": {"japanese": "バーレル火山内　ヒノピオのお店、<br>まん中のカウンターは　なに屋さん？",
	                				"romaji": "Bāreru kazan-nai hinopio no o-ten, man'naka no kauntā wa nani-ya-san?",
	                				"english": "What does Hinopio operate in the middle counter of Barrel Volcano?"},
        	                	"answers":[{"japanese": "宿屋", "romaji": "Yadoya", "english": "Inn"},
        	                	           {"japanese": "ぶきぼうぐ屋た", "romaji": "Buki bōgu-ya", "english": "Weapon shop"},
        	                	           {"japanese": "アイテム屋", "romaji": "Aitemu-ya", "english": "Item shop"}],
	                	"correct": 1,
	                	"qimage": "26q.png",
	                	"aimage": "26a.png"
	                },
	                {
	                	"question": {"japanese": "ジャッキーの技はどれ？",
	                				"romaji": "Jakkī no waza wa dore?",
	                				"english": "Which of these is Jinx's attack?"},
        	                	"answers":[{"japanese": "ほうげきうんしんそうこしょう", "romaji": "Hō geki un shin sō koshō", "english": "Shelling Yeah Shinso pepper"},
        	                	           {"japanese": "てつざんこう", "romaji": "Tetsuzankō", "english": "Quiksilver"},
        	                	           {"japanese": "もんぜつむちむちプリンぜめ", "romaji": "Monzetsu muchimuchipurin ze me", "english": "Lesbian couples Muchimuchi pudding Trombone"}],
	                	"correct": 2,
	                	"qimage": "27q.png",
	                	"aimage": "27a.png"
	                },
	                {
	                	"question": {"japanese": "植物モンスター　キャロライン、<br>何が変身したもの？",
	                				"romaji": "Shokubutsu monsutā kyarorain,<br>nani ga henshin shita mono?",
	                				"english": "What was Carroboscis turned into?"},
        	                	"answers":[{"japanese": "にんじん", "romaji": "Ninjin", "english": "Carrot"},
        	                	           {"japanese": "あかかぶ", "romaji": "Akakabu", "english": "Turnip"},
        	                	           {"japanese": "さくらじまだいこん", "romaji": "Sakurajima daikon", "english": "Radish"}],
	                	"correct": 1,
	                	"qimage": "28q.png",
	                	"aimage": "28a.png"
	                },
	                {
	                	"question": {"japanese": "今回のぼうけんの敵は？",
	                				"romaji": "Konkai no bō ken no teki wa?",
	                				"english": "Who is the enemy of this adventure?"},
        	                	"answers":[{"japanese": "カジオー", "romaji": "Kajiō", "english": "Smithy"},
        	                	           {"japanese": "ルイージ", "romaji": "Ruiji", "english": "Luigi"},
        	                	           {"japanese": "ケフカ", "romaji": "Kefuka", "english": "Kefka"}],
	                	"correct": 1,
	                	"qimage": "29q.png",
	                	"aimage": "29a.png"
	                },
	                {
	                	"question": {"japanese": "パイプダンジョンに入って<br>最初にあらわれるモンスターは？",
	                				"romaji": "Paipudanjon ni haitte<br>saisho ni arawareru monsutā wa?",
	                				"english": "Which monster first appears in Pipe Vault?"},
        	                	"answers":[{"japanese": "クリボー", "romaji": "Kuribō", "english": "Goomba"},
        	                	           {"japanese": "バブル", "romaji": "Baburu", "english": "Sparky"},
        	                	           {"japanese": "エクスデス", "romaji": "Ekusudesu", "english": "Exdeath"}],
	                	"correct": 2,
	                	"qimage": "30q.png",
	                	"aimage": "30a.png"
	                },
	                {
	                	"question": {"japanese": "マリオの家のカーテンはなに色？",
	                				"romaji": "Mario no ie no kāten wa naniiro?",
	                				"english": "What colour are the curtains in Mario's house?"},
        	                	"answers":[{"japanese": "青", "romaji": "Ao", "english": "Blue"},
        	                	           {"japanese": "みどり", "romaji": "Midori", "english": "Green"},
        	                	           {"japanese": "ピンク", "romaji": "Pinku", "english": "Pink"}],
	                	"correct": 1,
	                	"qimage": "31q.png",
	                	"aimage": "31a.png"
	                },
	                {
	                	"question": {"japanese": "ケロケロ湖のおんがくかの名前は？",
	                				"romaji": "Kerokero mizūmi no ongakuka no namae wa?",
	                				"english": "What is the name of the musician in Tadpole Pond?"},
        	                	"answers":[{"japanese": "キノコスフキー", "romaji": "Kinokosufukī", "english": "Toadsfki"},
        	                	           {"japanese": "キノコフスキー", "romaji": "Kinokofusukī", "english": "Toadofsky"},
        	                	           {"japanese": "テブラデスキー", "romaji": "Teburadesukī", "english": "Teburadesuki"}],
	                	"correct": 2,
	                	"qimage": "32q.png",
	                	"aimage": "32a.png"
	                },
	                {
	                	"question": {"japanese": "かいぞくジョナサンのフルネームは？",
	                				"romaji": "Kai zo ku Jonasan no furunēmu wa?",
	                				"english": "What is the full name of the pirate Johnny Jones?"},
        	                	"answers":[{"japanese": "ジョナサン・ジョーズ", "romaji": "Jonasan jōzu", "english": "Jonathan Joseph"},
        	                	           {"japanese": "ジョナサン・ジョバンニ", "romaji": "Jonasan joban'ni", "english": "Jonathan Giovanni"},
        	                	           {"japanese": "ジョナサン・ジョーンズ", "romaji": "Jonasan jōnzu", "english": "Jonathan Jones"}],
	                	"correct": 3,
	                	"qimage": "33q.png",
	                	"aimage": "33a.png"
	                },
	                {
	                	"question": {"japanese": "今のブッキーは何代目？",
	                				"romaji": "Ima no bukkī wa nan-daime?",
	                				"english": "What generation is Booster?"},
        	                	"answers":[{"japanese": "7代目", "romaji": "7-Daime", "english": "7th"},
        	                	           {"japanese": "8代目", "romaji": "8-Daime", "english": "8th"},
        	                	           {"japanese": "48代目", "romaji": "48-Daime", "english": "48th"}],
	                	"correct": 1,
	                	"qimage": "34q.png",
	                	"aimage": "34a.png"
	                },
	                {
	                	"question": {"japanese": "カブト虫のメスのねだんは？",
	                				"romaji": "Kabutomushi no mesu no nedan wa?",
	                				"english": "How much does a female beetle sell for?"},
        	                	"answers":[{"japanese": "1コイン", "romaji": "1 koin", "english": "1 coin"},
        	                	           {"japanese": "50コイン", "romaji": "50 koin", "english": "50 coin"},
        	                	           {"japanese": "カエルコイン", "romaji": "Kaerukoin", "english": "Frog coin"}],
	                	"correct": 1,
	                	"qimage": "35q.png",
	                	"aimage": "35a.png"
	                },
	                {
	                	"question": {"japanese": "ナンシーの夫の名前は？",
	                				"romaji": "Nanshī no otto no namae wa?",
	                				"english": "What is the name of Nancy's (Raini's) husband?"},
        	                	"answers":[{"japanese": "キノ", "romaji": "Kino", "english": "Raz"},
        	                	           {"japanese": "ケロ", "romaji": "Kero", "english": "Kero"},
        	                	           {"japanese": "スイロ", "romaji": "Suiro", "english": "Sewer"}],
	                	"correct": 1,
	                	"qimage": "36q.png",
	                	"aimage": "36a.png"
	                },
	                {
	                	"question": {"japanese": "マイトはダイナの？",
	                				"romaji": "Maito wa daina no?",
	                				"english": "What is Mite to Dyna?"},
        	                	"answers":[{"japanese": "あね", "romaji": "Ane", "english": "Sister"},
        	                	           {"japanese": "おとうと", "romaji": "Otōto", "english": "Brother"},
        	                	           {"japanese": "こいびと", "romaji": "Koibito", "english": "Lover"}],
	                	"correct": 2,
	                	"qimage": "37q.png",
	                	"aimage": "37a.png"
	                },
	                {
	                	"question": {"japanese": "ゲッソー、クララ、プクプク、<br>彼らに共通する事は？",
	                				"romaji": "Gessō, Kurara, pukupuku,<br>karera ni kyōtsū suru koto wa?",
	                				"english": "What do Bloober, Leuko, and Goby have in common?"},
        	                	"answers":[{"japanese": "でんげきをつかう", "romaji": "Den geki o tsukau", "english": "They go shopping together"},
        	                	           {"japanese": "海のいきもの", "romaji": "Uminoikimono", "english": "Sea creatures"},
        	                	           {"japanese": "昔バンドをやっていた", "romaji": "Mukashi bando o yatte i", "english": "They were in a band"}],
	                	"correct": 2,
	                	"qimage": "38q.png",
	                	"aimage": "38a.png"
	                },
	                {
	                	"question": {"japanese": "レッドヨッシーエキスのこうかは？",
	                				"romaji": "Reddoyosshīekisu no kōka wa?",
	                				"english": "What does Red Essence do?"},
        	                	"answers":[{"japanese": "なんだかねむくなっちゃった", "romaji": "Nandaka nemuku natchatta", "english": "Makes you sleepy"},
        	                	           {"japanese": "なにやら力がわいてきた", "romaji": "Naniyara chikara ga waite kita", "english": "Makes you strong"},
        	                	           {"japanese": "関節のいたみをやわらげる", "romaji": "Kansetsu no itami o yawarageru", "english": "Relieves joint pain"}],
	                	"correct": 2,
	                	"qimage": "39q.png",
	                	"aimage": "39a.png"
	                },
	                {
	                	"question": {"japanese": "グルメモンスター　デミグラ、<br>彼が　はだみはなさず　もっている食器は？",
	                				"romaji": "Gurumemonsutā demigura, kare ga hadamihanasazu motte iru shokki wa?",
	                				"english": "What does Jawful use?"},
        	                	"answers":[{"japanese": "フォーク", "romaji": "Fōku", "english": "Fork"},
        	                	           {"japanese": "ナイフ", "romaji": "Naifu", "english": "Knife"},
        	                	           {"japanese": "ほうちょう", "romaji": "Hōchō", "english": "Kitchen knife"}],
	                	"correct": 1,
	                	"qimage": "40q.png",
	                	"aimage": "40a.png"
	                }
	                
	                ];
	var activeQuestionArray = [];
	$scope.quiz.selectedQuestion = {};
	$scope.questionsAttempted = questions.length - 1;

	function setQuestion () {
		$scope.questionsAttempted++;
		if ($scope.questionsAttempted == questions.length) {
			activeQuestionArray = shuffle(questions);
			$scope.questionsAttempted = 0;
		}
		$scope.quiz.selectedQuestion = activeQuestionArray[$scope.questionsAttempted];
	}
	
	$scope.isCorrect = function(answer) {
		 
		if (answer == $scope.quiz.selectedQuestion.answers[$scope.quiz.selectedQuestion.correct - 1].japanese) {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Correct!',
			     template: "<span class='right-answer'><b>" + answer + "</b></span> is the correct answer.",
			     buttons: [{ text: "OK", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		else {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Incorrect',
			     template: answer + " is not the correct answer.",
				     buttons: [{ text: "Try Again", type: 'button-positive'},
				               { text: "New Question", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		alertPopup;
	}
	
	setQuestion();
})


.controller('UQuizCtrl', function($scope, $ionicPopup) {
	
	$scope.quiz = {};
	var questions = [
	                {
	                	"question": "How much...does a<br>female beetle cost?",
	                	"answers":["(1 coin)", "(50 coins)", "(A frog coin)"],
	                	"correct": 1
	                },
	                {"question": "DR. TOPPER: What does Belome<br>really like to turn people into?",
	                	"answers": ["Scarecrows", "Ice cream cones", "Mushrooms"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: What is Raini's<br>husband's name?",
	                	"answers": ["Raz", "Romeo", "Gaz"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: What's the name of<br>the boss at the Sunken Ship?",
	                	"answers": ["Johnny", "Jimmy", "Jackson"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: Booster is what<br>generation?",
	                	"answers": ["7th", "8th", "78th"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: Where was the 3rd<br>Star Piece found?",
	                	"answers": ["Moleville", "Forest Maze", "Star Hill"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: Johnny loves WHICH<br>beverage?...",
	                	"answers": ["Currant juice", "Grape juice", "Boysenberry smoothie"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: In the Moleville blues,<br>it's said that the moles are<br>covered in what?",
	                	"answers": ["Soil", "Dirt", "Slugs"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: What color are the<br>curtains in Mario's house?",
	                	"answers": ["Blue", "Green", "Red"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: Yaridovich is what?",
	                	"answers": ["A boss", "A new breed of cattle", "A special attack"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: The boy at the inn in<br>Mushroom Kingdom was playing<br>with...What?",
	                	"answers": ["Game Boy", "Super NES", "Virtual Boy"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: What did Carroboscis<br>turn into?",
	                	"answers": ["A carrot", "A beet", "A radish"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: Who is the famous<br>sculptor in Nimbus Land?",
	                	"answers": ["Garro", "Gaz", "Goya"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: What is Hinopio in<br>charge of at the middle counter?",
	                	"answers": ["The inn", "Weapons", "Items"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: Who is the ultimate<br>enemy in this adventure?",
	                	"answers": ["Smithy", "Bowser", "Goomba"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: Who is the leader of<br>The Axem Rangers?",
	                	"answers": ["Red", "Black", "Green"],
	                	"correct": 1},
	                	{"question": "DR. TOPPER: What's the name of<br>Jagger's “sensei”?",
	                	"answers": ["Dinky", "Jinx", "Johnny"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: How many underlings<br>does Croco have?",
	                	"answers": ["2", "3", "4"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What was Toadstool<br>doing when she was kidnapped by<br>Bowser?",
	                	"answers": ["She was playing cards", "She was looking at flowers", "She was digging for worms"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: Who is the famous<br>composer at Tadpole Pond?",
	                	"answers": ["Toadoskfy", "Toadofsky", "Frogfucius"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: Which monster does<br>not appear in Booster Tower?",
	                	"answers": ["Jester", "Terrapin", "Bob-omb"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: The boy getting his<br>picture taken at Marrymore<br>can't wait 'til which season?",
	                	"answers": ["Hunting", "Skiing", "Baseball"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What technique does<br>Bowser learn at Level 15?",
	                	"answers": ["Bowser Crush", "Crusher", "Terrorize"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What words does<br>Shy Away use when he sings?",
	                	"answers": ["Dum dee dah~", "La dee dah~", "Dum lee lah~"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What does Birdo<br>come out of?",
	                	"answers": ["A barrel", "An eggshell", "A basket"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What's the first<br>monster you see in the Pipe Vault?",
	                	"answers": ["Goomba", "Sparky", "Chompweed"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What's the password<br>in the Sunken Ship?",
	                	"answers": ["Corals", "Pearls", "Oyster"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What was Mallow<br>asked to get for Frogfucius?",
	                	"answers": ["Honey Syrup", "Cricket Pie", "Carbo Cookie"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: Mite is Dyna's...<br>WHAT?",
	                	"answers": ["Big sister", "Little brother", "Second cousin"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What does the Red<br>Essence do?",
	                	"answers": ["Makes you sleepy", "Gives you strength", "Relieves back pain"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: How long have the<br>couple inside the chapel been<br>waiting for their wedding?",
	                	"answers": ["1 hour", "30 minutes", "45 minutes"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What do Culex, Jinx,<br>and Goomba have in common?",
	                	"answers": ["They are immortal", "They live in Monstro Town", "They all like bratwurst"],
	                	"correct": 2},
	                	{"question": "DR. TOPPER: What is the 4th<br>selection on the Menu screen?",
	                	"answers": ["Important Items", "Special Items", "Equip"],
	                	"correct": 3},
	                	{"question": "DR. TOPPER: The man getting his<br>picture taken at Marrymore<br>hates what?",
	                	"answers": ["Getting married", "Mowing the lawn on Sundays", "Getting his picture taken"],
	                	"correct": 3},
	                	{"question": "DR. TOPPER: Where was the 1st<br>Star Piece found?",
	                	"answers": ["Bowser's Keep", "Mario's Pad", "Mushroom Kingdom"],
	                	"correct": 3},
	                	{"question": "DR. TOPPER: How many legs does<br>Wiggler have?",
	                	"answers": ["10", "8", "6"],
	                	"correct": 3},
	                	{"question": "DR. TOPPER: What's the full name<br>of the boss at the Sunken Ship?",
	                	"answers": ["Johnny Jones", "Jesse James Jones", "Jonathan Jones"],
	                	"correct": 3},
	                	{"question": "DR. TOPPER: Who helped you up the<br>cliff at Land's End?",
	                	"answers": ["Sky Troops", "Flying Troopa", "Sky Troopas"],
	                	"correct": 3},
	                	{"question": "DR. TOPPER: What color is the<br>end of Dodo's beak?",
	                	"answers": ["Yellow", "Orange", "Red"],
	                	"correct": 3},
	                	{"question": "DR. TOPPER: What's the chef's<br>name at Marrymore?",
	                	"answers": ["Blintz", "Gateau", "Torte"],
	                	"correct": 3}];
	
	var activeQuestionArray = [];
	$scope.quiz.selectedQuestion = {};
	$scope.questionsAttempted = questions.length - 1;

	function setQuestion () {
		$scope.questionsAttempted++;
		if ($scope.questionsAttempted == questions.length) {
			activeQuestionArray = shuffle(questions);
			$scope.questionsAttempted = 0;
		}
		$scope.quiz.selectedQuestion = activeQuestionArray[$scope.questionsAttempted];
	}
	
	$scope.isCorrect = function(answer) {
		  
		if (answer == $scope.quiz.selectedQuestion.answers[$scope.quiz.selectedQuestion.correct - 1]) {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Correct!',
			     template: "<span class='right-answer'><b>" + answer + "</b></span> is the correct answer.",
			     buttons: [{ text: "OK", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		else {
			 var alertPopup = $ionicPopup.alert({
			     title: 'Incorrect',
			     template: answer + " is not the correct answer.",
				     buttons: [{ text: "Try Again", type: 'button-positive'},
				               { text: "New Question", type: 'button-positive', onTap: function(e) { setQuestion();}}]
			   });
		}
		alertPopup;
	}
	
	
	
	setQuestion();
})

.controller('KanjiCtrl', function($scope) {
	$scope.form = {};
	$scope.searchTerm = "";
	
	var kanjis = [{"character": "一人前", "translation": "Serving"},
{"character": "一同", "translation": "Everyone"},
{"character": "一回", "translation": "once"},
{"character": "一族", "translation": "Clan"},
{"character": "一日", "translation": "one day"},
{"character": "一番", "translation": "Most"},
{"character": "一番幸", "translation": "Most seafood"},
{"character": "一発", "translation": "One shot"},
{"character": "三度目", "translation": "Third time"},
{"character": "三次元", "translation": "Three dimensions"},
{"character": "上", "translation": "Up"},
{"character": "上下", "translation": "Up and down"},
{"character": "上司", "translation": "boss"},
{"character": "上空", "translation": "Sky"},
{"character": "下", "translation": "under"},
{"character": "下見", "translation": "Preliminary inspection"},
{"character": "不幸", "translation": "Unhappy"},
{"character": "世", "translation": "world"},
{"character": "世界", "translation": "world"},
{"character": "世界中", "translation": "in the world"},
{"character": "世話", "translation": "Care"},
{"character": "丘", "translation": "hill"},
{"character": "両名", "translation": "Both persons"},
{"character": "両方", "translation": "Both"},
{"character": "中", "translation": "During ~"},
{"character": "中古", "translation": "second hand"},
{"character": "丸", "translation": "Circle"},
{"character": "主", "translation": "owner"},
{"character": "乍", "translation": "Notwithstanding"},
{"character": "乗", "translation": "Power"},
{"character": "予定", "translation": "plans"},
{"character": "予想", "translation": "Forecast"},
{"character": "事", "translation": "Thing"},
{"character": "事実", "translation": "fact"},
{"character": "二", "translation": "two"},
{"character": "二度", "translation": "Two degrees"},
{"character": "交通", "translation": "traffic"},
{"character": "人", "translation": "Man"},
{"character": "人以外", "translation": "Non-human"},
{"character": "人前", "translation": "public"},
{"character": "人形", "translation": "doll"},
{"character": "人気", "translation": "Popularity"},
{"character": "人物", "translation": "person"},
{"character": "人生", "translation": "life"},
{"character": "人租", "translation": "People mining lease"},
{"character": "人間", "translation": "Human"},
{"character": "今", "translation": "now"},
{"character": "今出", "translation": "Out now"},
{"character": "今回", "translation": "this time"},
{"character": "今度", "translation": "now"},
{"character": "今日", "translation": "today"},
{"character": "今月", "translation": "this month"},
{"character": "今来", "translation": "Konrai"},
{"character": "今気", "translation": "Care now"},
{"character": "仕", "translation": "Specifications"},
{"character": "仕事", "translation": "work"},
{"character": "仕方", "translation": "Way"},
{"character": "他", "translation": "other"},
{"character": "付", "translation": "With"},
{"character": "仙人", "translation": "Hermit"},
{"character": "代", "translation": "Generation"},
{"character": "代目", "translation": "generation"},
{"character": "以上", "translation": "that's all"},
{"character": "以下", "translation": "Less than"},
{"character": "以前", "translation": "Before"},
{"character": "以外", "translation": "Excepting"},
{"character": "仮", "translation": "Provisional"},
{"character": "仲", "translation": "Relationship"},
{"character": "仲間", "translation": "Friend"},
{"character": "仲間達", "translation": "Pals"},
{"character": "休", "translation": "Holiday"},
{"character": "会", "translation": "Meeting"},
{"character": "会計", "translation": "Accounting"},
{"character": "伝", "translation": "Den"},
{"character": "伝説", "translation": "Legend"},
{"character": "位置", "translation": "position"},
{"character": "低", "translation": "Low"},
{"character": "住", "translation": "Living"},
{"character": "住人", "translation": "Resident"},
{"character": "住民", "translation": "residents"},
{"character": "体", "translation": "body"},
{"character": "体力回復", "translation": "Stamina recovery"},
{"character": "何", "translation": "what"},
{"character": "何人", "translation": "Anyone"},
{"character": "何代目", "translation": "What generation"},
{"character": "何回", "translation": "How many times"},
{"character": "何度", "translation": "Many times"},
{"character": "何秒", "translation": "Many seconds"},
{"character": "何者", "translation": "Who"},
{"character": "作", "translation": "Work"},
{"character": "作戦", "translation": "Strategy"},
{"character": "作曲", "translation": "Composition"},
{"character": "使", "translation": "Use"},
{"character": "使命", "translation": "mission"},
{"character": "使者", "translation": "messenger"},
{"character": "例", "translation": "Example"},
{"character": "係", "translation": "Engagement"},
{"character": "信", "translation": "Trust"},
{"character": "倍", "translation": "Double"},
{"character": "倒", "translation": "Debt"},
{"character": "働", "translation": "Labor"},
{"character": "元", "translation": "Origin"},
{"character": "元気", "translation": "Healthy"},
{"character": "兄", "translation": "Brother"},
{"character": "兄弟", "translation": "Brother"},
{"character": "先", "translation": "Previous"},
{"character": "先日", "translation": "The other day"},
{"character": "先生", "translation": "teacher"},
{"character": "光", "translation": "light"},
{"character": "入", "translation": "Input"},
{"character": "入会", "translation": "Admission"},
{"character": "入会金", "translation": "Admission fee"},
{"character": "入口", "translation": "entrance"},
{"character": "入場", "translation": "Admission"},
{"character": "全", "translation": "all"},
{"character": "全力", "translation": "Utmost"},
{"character": "全員", "translation": "All members"},
{"character": "全回復", "translation": "Full recovery"},
{"character": "全部", "translation": "All"},
{"character": "共通", "translation": "Common"},
{"character": "共鳴", "translation": "Resonance"},
{"character": "兵器", "translation": "weapons"},
{"character": "具屋", "translation": "Guya"},
{"character": "内", "translation": "The inner"},
{"character": "出", "translation": "Out"},
{"character": "出世", "translation": "Success"},
{"character": "出入", "translation": "In and out"},
{"character": "出口", "translation": "Exit"},
{"character": "出来", "translation": "Can"},
{"character": "出番", "translation": "Turn"},
{"character": "出発進行", "translation": "Starting progress"},
{"character": "出続", "translation": "Dezoku"},
{"character": "分", "translation": "Minute"},
{"character": "切", "translation": "OFF"},
{"character": "別", "translation": "Different"},
{"character": "利用", "translation": "Use"},
{"character": "前", "translation": "Before"},
{"character": "前達", "translation": "Before us"},
{"character": "剣", "translation": "sword"},
{"character": "力", "translation": "Power"},
{"character": "力不足", "translation": "Inadequacy"},
{"character": "力倍", "translation": "Chikarabai"},
{"character": "力強", "translation": "Strength"},
{"character": "助", "translation": "Assistant"},
{"character": "勇気", "translation": "courage"},
{"character": "動", "translation": "Motion"},
{"character": "勝", "translation": "Wins"},
{"character": "勝手", "translation": "Selfishness"},
{"character": "勝敗", "translation": "Victory or defeat"},
{"character": "勝負", "translation": "Game"},
{"character": "十字", "translation": "cross"},
{"character": "千里", "translation": "Thousand miles"},
{"character": "半分", "translation": "Half"},
{"character": "協力", "translation": "Cooperation"},
{"character": "南", "translation": "South"},
{"character": "友", "translation": "friend"},
{"character": "友達", "translation": "friend"},
{"character": "反面", "translation": "On the other hand"},
{"character": "取", "translation": "Preparative"},
{"character": "受", "translation": "Received"},
{"character": "口", "translation": "mouth"},
{"character": "台所", "translation": "kitchen"},
{"character": "右", "translation": "right"},
{"character": "右上", "translation": "Upper right"},
{"character": "右下", "translation": "Lower right"},
{"character": "右手", "translation": "right hand"},
{"character": "号", "translation": "issue"},
{"character": "司", "translation": "Tsukasa"},
{"character": "合", "translation": "If"},
{"character": "合体", "translation": "Coalescence"},
{"character": "合計", "translation": "total"},
{"character": "同", "translation": "same"},
{"character": "名", "translation": "Name"},
{"character": "名乗", "translation": "Self-introduction"},
{"character": "名人", "translation": "Expert"},
{"character": "名前", "translation": "name"},
{"character": "向", "translation": "Direction"},
{"character": "君", "translation": "You"},
{"character": "味", "translation": "taste"},
{"character": "味方", "translation": "Ally"},
{"character": "味方全員", "translation": "All allies"},
{"character": "味見", "translation": "Tasting"},
{"character": "呼", "translation": "Call"},
{"character": "命", "translation": "life"},
{"character": "品", "translation": "Goods"},
{"character": "品切", "translation": "Goods off"},
{"character": "商品", "translation": "Product"},
{"character": "問", "translation": "Asking"},
{"character": "問出", "translation": "Out of question"},
{"character": "問題", "translation": "problem"},
{"character": "喜", "translation": "Hee"},
{"character": "器具", "translation": "Equipment"},
{"character": "四千里", "translation": "Four Chisato"},
{"character": "回", "translation": "Time"},
{"character": "回以上", "translation": "Or more times"},
{"character": "回分", "translation": "Batch"},
{"character": "回復", "translation": "recovery"},
{"character": "回考", "translation": "Kaiko"},
{"character": "回転", "translation": "rotation"},
{"character": "図", "translation": "Figure"},
{"character": "国", "translation": "Country"},
{"character": "園芸家", "translation": "Horticulturist"},
{"character": "園芸生活", "translation": "Gardening life"},
{"character": "土", "translation": "soil"},
{"character": "地", "translation": "Earth"},
{"character": "地上", "translation": "The ground"},
{"character": "坂", "translation": "Slope"},
{"character": "垂", "translation": "Vertical"},
{"character": "型", "translation": "Type"},
{"character": "城", "translation": "castle"},
{"character": "城下町宿屋", "translation": "Castle town inn"},
{"character": "城前", "translation": "Jozen"},
{"character": "城行", "translation": "JoKo"},
{"character": "場", "translation": "Place"},
{"character": "場合", "translation": "Case"},
{"character": "場所", "translation": "place"},
{"character": "増", "translation": "Increase"},
{"character": "声", "translation": "voice"},
{"character": "売", "translation": "Sales"},
{"character": "変", "translation": "Strange"},
{"character": "変身", "translation": "Transform"},
{"character": "夏休", "translation": "Summer"},
{"character": "外", "translation": "Outside"},
{"character": "外出中", "translation": "Not at home"},
{"character": "多", "translation": "Multi"},
{"character": "多少", "translation": "Somewhat"},
{"character": "夜", "translation": "Night"},
{"character": "夜空", "translation": "night sky"},
{"character": "大", "translation": "Big"},
{"character": "大事", "translation": "Importance"},
{"character": "大先生", "translation": "Large teacher"},
{"character": "大型乗", "translation": "Large power"},
{"character": "大変", "translation": "very"},
{"character": "大好", "translation": "Daiyoshimi"},
{"character": "大家", "translation": "Landlord"},
{"character": "大当", "translation": "Daito"},
{"character": "大臣", "translation": "Minister"},
{"character": "大金", "translation": "Lot of money"},
{"character": "大金持", "translation": "Large rich"},
{"character": "大雨", "translation": "heavy rain"},
{"character": "大魔王", "translation": "Great Satan"},
{"character": "天気", "translation": "weather"},
{"character": "天空", "translation": "sky"},
{"character": "太", "translation": "Thick"},
{"character": "夫", "translation": "husband"},
{"character": "失礼", "translation": "Excuse me"},
{"character": "女", "translation": "woman"},
{"character": "女王", "translation": "Queen"},
{"character": "好", "translation": "Good"},
{"character": "姉", "translation": "sister"},
{"character": "始", "translation": "Hajime"},
{"character": "姫", "translation": "princess"},
{"character": "姫様", "translation": "Princess"},
{"character": "子", "translation": "Child"},
{"character": "子分", "translation": "Henchman"},
{"character": "字", "translation": "Character"},
{"character": "守", "translation": "Mamoru"},
{"character": "安全", "translation": "safety"},
{"character": "安全第一", "translation": "safety first"},
{"character": "安心", "translation": "Peace of mind"},
{"character": "安物", "translation": "Cheap article"},
{"character": "安静", "translation": "rest"},
{"character": "完成", "translation": "Completion"},
{"character": "定員", "translation": "Capacity"},
{"character": "宝", "translation": "Treasure"},
{"character": "宝箱", "translation": "Treasure Chest"},
{"character": "実", "translation": "Fruit"},
{"character": "客", "translation": "Customer"},
{"character": "客様", "translation": "customer"},
{"character": "客間", "translation": "Drawing room"},
{"character": "家", "translation": "House"},
{"character": "宿屋", "translation": "inn"},
{"character": "宿題", "translation": "home work"},
{"character": "寨", "translation": "寨"},
{"character": "対", "translation": "versus"},
{"character": "小", "translation": "small"},
{"character": "少", "translation": "Small"},
{"character": "居", "translation": "Home"},
{"character": "屋", "translation": "Monger"},
{"character": "屋根", "translation": "roof"},
{"character": "岩", "translation": "rock"},
{"character": "島", "translation": "island"},
{"character": "川", "translation": "river"},
{"character": "工事", "translation": "Construction"},
{"character": "工場", "translation": "factory"},
{"character": "工場見学", "translation": "Factory tour"},
{"character": "左", "translation": "left"},
{"character": "左上", "translation": "upper left"},
{"character": "左下", "translation": "Lower left"},
{"character": "左右", "translation": "Left and right"},
{"character": "左手", "translation": "left hand"},
{"character": "巨大", "translation": "Huge"},
{"character": "希望", "translation": "Hope"},
{"character": "帰", "translation": "Null"},
{"character": "平和", "translation": "peace"},
{"character": "平気", "translation": "Unconcern"},
{"character": "平面的", "translation": "Plane"},
{"character": "年", "translation": "Year"},
{"character": "年前", "translation": "year ago"},
{"character": "年早", "translation": "Year early"},
{"character": "幸", "translation": "Fortune"},
{"character": "店", "translation": "shop"},
{"character": "店主", "translation": "Shopkeeper"},
{"character": "度", "translation": "Degree"},
{"character": "度入", "translation": "Degree input"},
{"character": "建物", "translation": "building"},
{"character": "式", "translation": "formula"},
{"character": "式場", "translation": "Ceremonial hall"},
{"character": "引", "translation": "Argument"},
{"character": "弟", "translation": "Younger brother"},
{"character": "弱", "translation": "weak"},
{"character": "弱点無", "translation": "Weakness Mu"},
{"character": "弱風", "translation": "Weak wind"},
{"character": "強", "translation": "strength"},
{"character": "強力", "translation": "Powerful"},
{"character": "強敵", "translation": "Formidable enemy"},
{"character": "強風", "translation": "Strong wind"},
{"character": "当", "translation": "This"},
{"character": "当店", "translation": "This store"},
{"character": "当然", "translation": "Of course"},
{"character": "形作", "translation": "Form work"},
{"character": "形成", "translation": "Formation"},
{"character": "役", "translation": "Role"},
{"character": "役立", "translation": "Role stand"},
{"character": "彼", "translation": "he"},
{"character": "彼女", "translation": "Girlfriend"},
{"character": "待", "translation": "Wait"},
{"character": "後", "translation": "rear"},
{"character": "得", "translation": "Obtained"},
{"character": "復活", "translation": "Resurrection"},
{"character": "心", "translation": "heart"},
{"character": "心得", "translation": "Knowledge"},
{"character": "心配", "translation": "worry"},
{"character": "必", "translation": "必"},
{"character": "必要", "translation": "necessary"},
{"character": "思", "translation": "Think"},
{"character": "急", "translation": "Sudden"},
{"character": "息", "translation": "breath"},
{"character": "息子", "translation": "son"},
{"character": "悪", "translation": "evil"},
{"character": "悪者", "translation": "The bad guys"},
{"character": "悲", "translation": "Sad"},
{"character": "意味", "translation": "meaning"},
{"character": "意見", "translation": "opinion"},
{"character": "愛", "translation": "Love"},
{"character": "感", "translation": "Feeling"},
{"character": "感動", "translation": "Excitement"},
{"character": "成功", "translation": "success"},
{"character": "成果", "translation": "Achievement"},
{"character": "我", "translation": "I"},
{"character": "我等", "translation": "We like"},
{"character": "戦", "translation": "War"},
{"character": "所", "translation": "Place"},
{"character": "所定", "translation": "Prescribed"},
{"character": "手", "translation": "hand"},
{"character": "手下", "translation": "Myrmidon"},
{"character": "手伝", "translation": "help"},
{"character": "手持", "translation": "Hand"},
{"character": "手放", "translation": "Teho"},
{"character": "手紙", "translation": "letter"},
{"character": "扎", "translation": "扎"},
{"character": "打", "translation": "Hit"},
{"character": "払", "translation": "Payment"},
{"character": "扞", "translation": "扞"},
{"character": "扱", "translation": "Treated"},
{"character": "技", "translation": "Trick"},
{"character": "投", "translation": "Throw"},
{"character": "押", "translation": "Press"},
{"character": "持", "translation": "Equity"},
{"character": "持病", "translation": "Chronic disease"},
{"character": "探", "translation": "Exploration"},
{"character": "教", "translation": "Professor"},
{"character": "散", "translation": "Distributed"},
{"character": "数", "translation": "number"},
{"character": "数分", "translation": "Few minutes"},
{"character": "数字", "translation": "Number"},
{"character": "敵", "translation": "enemy"},
{"character": "敵全体", "translation": "The entire enemy"},
{"character": "敵単体", "translation": "Single enemy"},
{"character": "文字", "translation": "character"},
{"character": "料", "translation": "Fee"},
{"character": "料金", "translation": "Fee"},
{"character": "斤", "translation": "Loaf"},
{"character": "新", "translation": "new"},
{"character": "新型", "translation": "New model"},
{"character": "新手", "translation": "Newcomer"},
{"character": "新曲", "translation": "New song"},
{"character": "方", "translation": "Person"},
{"character": "方向", "translation": "direction"},
{"character": "方法", "translation": "Method"},
{"character": "方角", "translation": "direction"},
{"character": "旅", "translation": "Journey"},
{"character": "旅人", "translation": "Traveller"},
{"character": "旅行", "translation": "Travel"},
{"character": "族", "translation": "Family"},
{"character": "日", "translation": "Day"},
{"character": "日夜", "translation": "day and night"},
{"character": "日差", "translation": "Day difference"},
{"character": "早", "translation": "Early"},
{"character": "明", "translation": "Ming"},
{"character": "明日", "translation": "tomorrow"},
{"character": "昔", "translation": "Once upon a time"},
{"character": "星", "translation": "Star"},
{"character": "星様", "translation": "Star-like"},
{"character": "星降", "translation": "Hoshifu"},
{"character": "昨日", "translation": "yesterday"},
{"character": "時", "translation": "Time"},
{"character": "時代", "translation": "Era"},
{"character": "時点", "translation": "Time"},
{"character": "時計", "translation": "clock"},
{"character": "時間", "translation": "time"},
{"character": "時間内", "translation": "Within the time"},
{"character": "晴", "translation": "Cloudy"},
{"character": "曲", "translation": "The song"},
{"character": "曲芸", "translation": "Acrobatics"},
{"character": "書", "translation": "book"},
{"character": "書物", "translation": "book"},
{"character": "最", "translation": "Most"},
{"character": "最上階", "translation": "top floor"},
{"character": "最中", "translation": "Midst"},
{"character": "最初", "translation": "the first"},
{"character": "最大", "translation": "maximum"},
{"character": "最強", "translation": "strongest"},
{"character": "最後", "translation": "last"},
{"character": "最新作", "translation": "Most recent work"},
{"character": "最近", "translation": "Recently"},
{"character": "最高", "translation": "Highest"},
{"character": "最高得点", "translation": "Highest grade"},
{"character": "有名", "translation": "Famous"},
{"character": "望", "translation": "Nozomu"},
{"character": "朝", "translation": "Morning"},
{"character": "木", "translation": "wood"},
{"character": "未完成", "translation": "unfinished"},
{"character": "本", "translation": "Book"},
{"character": "本体", "translation": "Body"},
{"character": "本当", "translation": "Truth"},
{"character": "本気", "translation": "Earnest"},
{"character": "本物", "translation": "The real thing"},
{"character": "本目", "translation": "This eye"},
{"character": "札", "translation": "Bill"},
{"character": "村", "translation": "village"},
{"character": "杖", "translation": "Cane"},
{"character": "来", "translation": "Come"},
{"character": "板", "translation": "Plate"},
{"character": "枚", "translation": "Sheet"},
{"character": "案", "translation": "Draft"},
{"character": "森", "translation": "Woods"},
{"character": "植", "translation": "Planted"},
{"character": "植木", "translation": "Garden tree"},
{"character": "植物", "translation": "plant"},
{"character": "楽", "translation": "easy"},
{"character": "様", "translation": "Mr"},
{"character": "様子", "translation": "Appearance"},
{"character": "橋", "translation": "bridge"},
{"character": "次", "translation": "Next"},
{"character": "次元", "translation": "dimension"},
{"character": "次第", "translation": "Dependent"},
{"character": "止", "translation": "Stop"},
{"character": "正直", "translation": "Honesty"},
{"character": "武器", "translation": "weapon"},
{"character": "武器世界", "translation": "Weapon world"},
{"character": "武器屋", "translation": "Weapon Shop"},
{"character": "武器工場", "translation": "Armory"},
{"character": "武器達", "translation": "Weapon we"},
{"character": "武士", "translation": "samurai"},
{"character": "歩", "translation": "Step"},
{"character": "死", "translation": "death"},
{"character": "残", "translation": "The remaining"},
{"character": "残念", "translation": "Shame"},
{"character": "母", "translation": "mother"},
{"character": "毎日", "translation": "every day"},
{"character": "毒", "translation": "poison"},
{"character": "気", "translation": "Care"},
{"character": "気分", "translation": "Feeling"},
{"character": "気持", "translation": "feeling"},
{"character": "気配", "translation": "Hint"},
{"character": "水", "translation": "water"},
{"character": "水仕事", "translation": "Wet work"},
{"character": "水路", "translation": "Waterway"},
{"character": "求", "translation": "Sought"},
{"character": "決", "translation": "Determined"},
{"character": "決定", "translation": "Decision"},
{"character": "決心", "translation": "Decision"},
{"character": "治", "translation": "Osamu"},
{"character": "波動", "translation": "Wave"},
{"character": "泣", "translation": "Cry"},
{"character": "注意", "translation": "Caution"},
{"character": "注意書", "translation": "Cautionary note"},
{"character": "注文", "translation": "order"},
{"character": "泪", "translation": "Tears"},
{"character": "流", "translation": "Flow"},
{"character": "流星", "translation": "meteor"},
{"character": "流道場", "translation": "Flow dojo"},
{"character": "海", "translation": "Ocean"},
{"character": "海水", "translation": "Seawater"},
{"character": "消", "translation": "Extinguishing"},
{"character": "湖", "translation": "lake"},
{"character": "湘", "translation": "Xiang"},
{"character": "湯", "translation": "Hot water"},
{"character": "火", "translation": "fire"},
{"character": "火山", "translation": "Volcano"},
{"character": "火山内", "translation": "The volcano"},
{"character": "火花", "translation": "spark"},
{"character": "炭坑", "translation": "Coalmine"},
{"character": "炭坑組合", "translation": "Coal mine union"},
{"character": "点", "translation": "point"},
{"character": "点以上取", "translation": "Taken more than a point"},
{"character": "無", "translation": "Nothing"},
{"character": "無事", "translation": "Safety"},
{"character": "無事助", "translation": "Safety assistant"},
{"character": "無事帰", "translation": "Safe return"},
{"character": "無害", "translation": "Harmlessness"},
{"character": "無敵", "translation": "invincible"},
{"character": "無用", "translation": "useless"},
{"character": "熱", "translation": "heat"},
{"character": "父", "translation": "father"},
{"character": "父上", "translation": "father"},
{"character": "物", "translation": "object"},
{"character": "物体", "translation": "object"},
{"character": "特別", "translation": "special"},
{"character": "玉", "translation": "ball"},
{"character": "王", "translation": "king"},
{"character": "王子", "translation": "prince"},
{"character": "王族", "translation": "Royal family"},
{"character": "王様", "translation": "King"},
{"character": "生", "translation": "Living"},
{"character": "生活", "translation": "life"},
{"character": "生産", "translation": "production"},
{"character": "用", "translation": "for"},
{"character": "用意", "translation": "Preparation"},
{"character": "男", "translation": "Man"},
{"character": "町", "translation": "town"},
{"character": "画面", "translation": "screen"},
{"character": "番", "translation": "Turn"},
{"character": "番目", "translation": "Th"},
{"character": "異物", "translation": "Foreign matter"},
{"character": "病気", "translation": "sick"},
{"character": "発", "translation": "Departure"},
{"character": "発音", "translation": "pronunciation"},
{"character": "登", "translation": "Noboru"},
{"character": "登場", "translation": "Appearance"},
{"character": "白", "translation": "White"},
{"character": "白銀", "translation": "Silver"},
{"character": "的", "translation": "Target"},
{"character": "皿", "translation": "dish"},
{"character": "目", "translation": "Eye"},
{"character": "目上", "translation": "superior"},
{"character": "目前", "translation": "Imminent"},
{"character": "直", "translation": "straight"},
{"character": "相", "translation": "phase"},
{"character": "相手", "translation": "Opponent"},
{"character": "真", "translation": "TRUE"},
{"character": "着", "translation": "Arriving"},
{"character": "矢", "translation": "arrow"},
{"character": "知", "translation": "Intellectual"},
{"character": "短", "translation": "Short"},
{"character": "石", "translation": "stone"},
{"character": "確", "translation": "Sure"},
{"character": "確信", "translation": "conviction"},
{"character": "確実", "translation": "Certainty"},
{"character": "礼", "translation": "Rei"},
{"character": "社長", "translation": "President"},
{"character": "私", "translation": "Me"},
{"character": "私達", "translation": "we"},
{"character": "秒", "translation": "Second"},
{"character": "秒以内", "translation": "Within seconds"},
{"character": "空", "translation": "Sky"},
{"character": "空中", "translation": "air"},
{"character": "空見", "translation": "Sorami"},
{"character": "立", "translation": "Stand"},
{"character": "立体", "translation": "Solid"},
{"character": "立体的", "translation": "Three-dimensional"},
{"character": "立体的世界", "translation": "Three-dimensional world"},
{"character": "立体迷路", "translation": "Three-dimensional maze"},
{"character": "立場", "translation": "position"},
{"character": "笑", "translation": "Lol"},
{"character": "等", "translation": "etc"},
{"character": "答", "translation": "Answer"},
{"character": "約束", "translation": "Promise"},
{"character": "紙", "translation": "paper"},
{"character": "終", "translation": "Final"},
{"character": "終末", "translation": "End"},
{"character": "結", "translation": "Sintered"},
{"character": "絵", "translation": "picture"},
{"character": "続", "translation": "Continued"},
{"character": "緑", "translation": "Green"},
{"character": "練習", "translation": "practice"},
{"character": "置", "translation": "Location"},
{"character": "美", "translation": "Beauty"},
{"character": "老人", "translation": "Old man"},
{"character": "考", "translation": "Remarks"},
{"character": "者", "translation": "Person"},
{"character": "聞", "translation": "Listen"},
{"character": "肋", "translation": "Rib"},
{"character": "育", "translation": "Education"},
{"character": "自信", "translation": "Self-confidence"},
{"character": "自分", "translation": "myself"},
{"character": "自然", "translation": "Nature"},
{"character": "自由", "translation": "freedom"},
{"character": "船", "translation": "boat"},
{"character": "良", "translation": "Good"},
{"character": "色", "translation": "color"},
{"character": "花", "translation": "flower"},
{"character": "花火", "translation": "fireworks"},
{"character": "苦", "translation": "Bitter"},
{"character": "苦労", "translation": "Hardships"},
{"character": "苦手", "translation": "Weak"},
{"character": "落", "translation": "Drop"},
{"character": "虫", "translation": "insect"},
{"character": "虫買", "translation": "Insect Offer"},
{"character": "行", "translation": "line"},
{"character": "表", "translation": "table"},
{"character": "見", "translation": "Look"},
{"character": "見事", "translation": "Beautiful"},
{"character": "見合", "translation": "Commensurate"},
{"character": "見当", "translation": "Register"},
{"character": "見習", "translation": "apprentice"},
{"character": "見送", "translation": "Mioku"},
{"character": "見逃", "translation": "Overlooked"},
{"character": "覚", "translation": "Satoru"},
{"character": "親分", "translation": "boss"},
{"character": "親玉", "translation": "Boss"},
{"character": "言", "translation": "Word"},
{"character": "言葉", "translation": "word"},
{"character": "記念品", "translation": "Souvenir"},
{"character": "話", "translation": "Story"},
{"character": "語", "translation": "word"},
{"character": "説明", "translation": "Description"},
{"character": "読", "translation": "Read"},
{"character": "調和", "translation": "Harmony"},
{"character": "調子", "translation": "Condition"},
{"character": "谷", "translation": "valley"},
{"character": "豆", "translation": "beans"},
{"character": "豆平原", "translation": "Beans plains"},
{"character": "負", "translation": "negative"},
{"character": "買", "translation": "Offer"},
{"character": "賞品", "translation": "prize"},
{"character": "赤", "translation": "Red"},
{"character": "走", "translation": "Run"},
{"character": "起", "translation": "Cause"},
{"character": "足", "translation": "leg"},
{"character": "足元", "translation": "foot"},
{"character": "足場", "translation": "scaffold"},
{"character": "足手", "translation": "Foot hand"},
{"character": "足音", "translation": "footsteps"},
{"character": "身", "translation": "Body"},
{"character": "込", "translation": "Included"},
{"character": "近", "translation": "Near"},
{"character": "返", "translation": "Return"},
{"character": "追", "translation": "Add"},
{"character": "追加", "translation": "add to"},
{"character": "送", "translation": "Feed"},
{"character": "逃", "translation": "Escape"},
{"character": "通", "translation": "Through"},
{"character": "通路", "translation": "aisle"},
{"character": "速", "translation": "Fast"},
{"character": "連", "translation": "Ream"},
{"character": "連打", "translation": "Barrage"},
{"character": "進", "translation": "Susumu"},
{"character": "遊", "translation": "Yu"},
{"character": "運", "translation": "luck"},
{"character": "運動", "translation": "motion"},
{"character": "運動不足", "translation": "Lack of exercise"},
{"character": "運命", "translation": "Destiny"},
{"character": "運行", "translation": "Service"},
{"character": "運行休止", "translation": "LAY UP"},
{"character": "運転", "translation": "operation"},
{"character": "道", "translation": "road"},
{"character": "道具屋", "translation": "Tool toul to"},
{"character": "道場", "translation": "dojo"},
{"character": "道路課", "translation": "Road Division"},
{"character": "達", "translation": "Reaches"},
{"character": "遠", "translation": "Distant"},
{"character": "部下", "translation": "Subordinate"},
{"character": "部屋", "translation": "room"},
{"character": "重", "translation": "Weight"},
{"character": "重大", "translation": "Significant"},
{"character": "野望達成", "translation": "Ambition achieved"},
{"character": "金", "translation": "Money"},
{"character": "鉄", "translation": "iron"},
{"character": "長", "translation": "The length"},
{"character": "長年", "translation": "For many years"},
{"character": "長年探", "translation": "Exploration for many years"},
{"character": "長老", "translation": "Elder"},
{"character": "門", "translation": "gate"},
{"character": "開", "translation": "Open"},
{"character": "間", "translation": "while"},
{"character": "関係", "translation": "Relationship"},
{"character": "関心", "translation": "interest"},
{"character": "関節", "translation": "joint"},
{"character": "降", "translation": "Later"},
{"character": "陸", "translation": "land"},
{"character": "隊", "translation": "Squad"},
{"character": "隊員", "translation": "Group members"},
{"character": "隊長", "translation": "Captain"},
{"character": "階", "translation": "Floor"},
{"character": "集", "translation": "Collection"},
{"character": "雨", "translation": "rain"},
{"character": "雲", "translation": "cloud"},
{"character": "青", "translation": "Blue"},
{"character": "音", "translation": "sound"},
{"character": "音楽", "translation": "musics"},
{"character": "順番", "translation": "Order"},
{"character": "頭", "translation": "Head"},
{"character": "顔", "translation": "face"},
{"character": "願", "translation": "Cancer"},
{"character": "風", "translation": "Wind"},
{"character": "飛", "translation": "Fei"},
{"character": "食", "translation": "Eclipse"},
{"character": "食品店", "translation": "Food store"},
{"character": "食器", "translation": "Tableware"},
{"character": "飲", "translation": "Drinking"},
{"character": "高", "translation": "High"},
{"character": "高得点", "translation": "high score"},
{"character": "高級感", "translation": "luxury"},
{"character": "魔法", "translation": "magic"},
{"character": "鳥", "translation": "bird"},
{"character": "鳴", "translation": "Tinnitus"},
{"character": "黄色", "translation": "yellow"},
{"character": "黒", "translation": "black"},
{"character": "黒服", "translation": "Black suit"},
{"character": "鼻", "translation": "nose"}];
	
	$scope.filterKanji = function() {
		if ($scope.form.searchTerm == undefined || $scope.form.searchTerm == null) {
			$scope.form.searchTerm = "";
		}
	
		$scope.kanjiList = kanjis.filter(function(a) {
			return (a.translation.toLowerCase().indexOf($scope.form.searchTerm.toLowerCase()) >= 0);
		});
	}
	$scope.filterKanji();
})