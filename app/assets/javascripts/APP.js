$(document).ready(function() {
  var bonusManager = new BonusManager('50a4476bb976d572be8930b96dd2519b', '30');
  bonusManager.loadBonuses({
    oncomplete: bonusManager.showBonuses.bind(bonusManager),
    onfailure: function() {
      alert('Failed to load data!');
    }
  });
});
