const readline = require("readline-sync");

for (;;) {
    console.log("");
    console.log("1. Subnet Host Checker");
    console.log("2. Compute Environment Selector");
    console.log("3. Exit");

    let names = readline.question("Enter your choice: ");

    if (names === "1") {
        let vpc = readline.question("VPC prefix without /: ");
        let subnet = readline.question("Subnet prefix without /: ");
        let devices = readline.question("Number of devices: ");

        vpc = Number(vpc);
        subnet = Number(subnet);
        devices = Number(devices);

        let valid = true;

        if (!Number.isInteger(vpc) || vpc < 16 || vpc > 30) {
            console.log("VPC must be a whole number from 16 to 30.");
            valid = false;
        }

        if (!Number.isInteger(subnet) || subnet < 16 || subnet > 30) {
            console.log("Subnet must be a whole number from 16 to 30.");
            valid = false;
        }

        if (!Number.isSafeInteger(devices) || devices <= 0) {
            console.log("Devices must be a positive whole number.");
            valid = false;
        }

        if (valid === true) {
            if (subnet >= vpc) {
                console.log("Subnet is consistent with the VPC.");
            } else {
                console.log("Subnet is inconsistent with the VPC.");
                console.log("This configuration is invalid.");
            }

            let total = 2 ** (32 - subnet);
            let available = total - 5;

            if (available < 0) {
                available = 0;
            }

            console.log("Total addresses: " + total);
            console.log("AWS reserves 5 addresses.");
            console.log("Usable addresses: " + available);

            if (available >= devices) {
                let unused = available - devices;

                console.log("There are enough addresses.");
                console.log("Unused addresses: " + unused);
            } else {
                let needed = devices - available;

                console.log("There are not enough addresses.");
                console.log("Additional addresses needed: " + needed);
            }
        }
            } else if (names === "2") {
        let app = readline.question("Application name: ");
        let usersInput = readline.question("Monthly users: ");
        let budgetInput = readline.question("Monthly budget in dollars: ");
        let ha = readline.question("High availability? yes/no: ");

        app = app.trim();
        usersInput = usersInput.trim();
        budgetInput = budgetInput.trim();
        ha = ha.trim();
        ha = ha.toLowerCase();

        let users = Number(usersInput);
        let budget = Number(budgetInput);

        let valid = true;

        if (app === "") {
            console.log("Enter an application name.");
            valid = false;
        }

        if (usersInput === "" || !Number.isSafeInteger(users) || users < 0) {
            console.log("Users must be a whole number of zero or more.");
            valid = false;
        }

        if (budgetInput === "" || !Number.isFinite(budget) || budget < 0) {
            console.log("Budget must be a number of zero or more.");
            valid = false;
        }

        if (ha !== "yes" && ha !== "no") {
            console.log("Enter yes or no for high availability.");
            valid = false;
        }

        if (valid === true) {
            let setup = "";

            if (ha === "yes") {
                setup = "EC2 + Load Balancer + Auto Scaling";
            } else if (users > 10000) {
                setup = "EC2 + Load Balancer + Auto Scaling";
            } else if (users >= 1000) {
                setup = "EC2 + Load Balancer";
            } else {
                setup = "Single EC2";
            }

            console.log("Application: " + app);
            console.log("Recommended setup: " + setup);

            if (budget < 1000) {
                if (setup !== "Single EC2") {
                    console.log("Warning: Budget is under $1,000.");
                    console.log("This setup needs more than a single EC2.");
                }
            } else if (budget <= 3000) {
                if (setup === "EC2 + Load Balancer + Auto Scaling") {
                    console.log("Warning: Budget is $1,000-$3,000.");
                    console.log("This setup requires Auto Scaling.");
                }
            }
        }

    } else if (names === "3") {
        console.log("Goodbye!");
        break;
    } else {
        console.log("Invalid choice.");
    }
}