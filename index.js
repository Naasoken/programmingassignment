const readline = require("readline-sync");

for (;;) {
  console.log("\n1. Subnet Host Checker");
  console.log("2. Compute Environment Selector");
  console.log("3. Exit");

  let names = readline.question("Choose 1, 2, or 3: ");

  if (names === "1") {
    let vpc = Number(readline.question("VPC prefix (16-30, without /): "));
    let subnet = Number(readline.question("Subnet prefix (16-30, without /): "));
    let devices = Number(readline.question("Number of devices: "));

    if (
      !Number.isInteger(vpc) || vpc < 16 || vpc > 30 ||
      !Number.isInteger(subnet) || subnet < 16 || subnet > 30 ||
      !Number.isSafeInteger(devices) || devices <= 0
    ) {
      console.log("Invalid input. Prefixes must be 16-30.");
      console.log("Devices must be a positive whole number.");
    } else {
      if (subnet >= vpc) {
        console.log("Subnet is consistent with the VPC.");
      } else {
        console.log("Subnet is inconsistent with the VPC.");
        console.log("This configuration is invalid.");
      }

      let available = 2 ** (32 - subnet) - 5;

      if (available < 0) {
        available = 0;
      }

      console.log("Usable addresses: " + available);

      if (available >= devices) {
        console.log("Enough addresses.");
        console.log("Unused addresses: " + (available - devices));
      } else {
        console.log("Not enough addresses.");
        console.log("Additional addresses needed: " + (devices - available));
      }
    }
      } else if (names === "2") {
    let app = readline.question("Application name: ").trim();
    let usersInput = readline.question("Monthly users: ").trim();
    let budgetInput = readline.question("Monthly budget in dollars: ").trim();
    let ha = readline.question("High availability? yes/no: ").trim().toLowerCase();

    let users = Number(usersInput);
    let budget = Number(budgetInput);

    if (
      app === "" || usersInput === "" || budgetInput === "" ||
      !Number.isSafeInteger(users) || users < 0 ||
      !Number.isFinite(budget) || budget < 0 ||
      (ha !== "yes" && ha !== "no")
    ) {
      console.log("Invalid input. Enter a name, valid users and budget, and yes/no.");
    } else {
      let setup;

      if (users > 10000 || ha === "yes") {
        setup = "EC2 + Load Balancer + Auto Scaling";
      } else if (users >= 1000) {
        setup = "EC2 + Load Balancer";
      } else {
        setup = "Single EC2";
      }

      console.log("Application: " + app);
      console.log("Recommended setup: " + setup);

      if (budget < 1000 && setup !== "Single EC2") {
        console.log("Warning: Budget under $1,000 for more than a single EC2.");
      } else if (
        budget >= 1000 && budget <= 3000 &&
        setup === "EC2 + Load Balancer + Auto Scaling"
      ) {
        console.log("Warning: Budget of $1,000-$3,000 with Auto Scaling.");
      }
    }

  } else if (names === "3") {
    console.log("Goodbye!");
    break;
  } else {
    console.log("Invalid choice.");
  }
}