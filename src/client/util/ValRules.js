const ValRules = [
  { mode: "development" },
  {
    log: {
      dev: function(data) {
        console.log(data);
      },
      prod: function(data) {
        console.log(data);
      }
    }
  },
  {
    name: "comment",
    required: true,
    alphanumeric: "true",
    errorMsg: "Please enter a comment"
  }
];

export default ValRules;
