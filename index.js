const readline = require("readline-sync");

for (;;) {
  console.log("\n1. Subnet Host Checker");
  console.log("2. Compute Environment Selector");
  console.log("3. Exit");

  let names = readline.question("Choose 1, 2, or 3: ");

  if (names === "1") {
    let vpc;
    let subnet;
    let devices;

    for (;;) {
      vpc = Number(readline.question("VPC prefix (16-30, without /): "));

      if (Number.isInteger(vpc) && vpc >= 16 && vpc <= 30) {
        break;
      } else {
        console.log("Enter a whole number from 16 to 30.");
      }
    }

    for (;;) {
      subnet = Number(readline.question("Subnet prefix (16-30, without /): "));

      if (Number.isInteger(subnet) && subnet >= 16 && subnet <= 30) {
        break;
      } else {
        console.log("Enter a whole number from 16 to 30.");
      }
    }

    for (;;) {
      devices = Number(readline.question("Number of devices: "));

      if (Number.isSafeInteger(devices) && devices > 0) {
        break;
      } else {
        console.log("Enter a positive whole number.");
      }
    }

    if (subnet >= vpc) {
      console.log("The subnet is consistent with the VPC.");
    } else {
      console.log("The subnet is inconsistent with the VPC.");
      console.log("This network configuration is invalid.");
    }

    let addresses = 2 ** (32 - subnet) - 5;

    if (addresses < 0) {
      addresses = 0;
    }

    console.log("Usable addresses after reserving 5: " + addresses);

    if (addresses >= devices) {
      console.log("The subnet has enough addresses.");
      console.log("Unused addresses: " + (addresses - devices));
    } else {
      console.log("The subnet does not have enough addresses.");
      console.log("Additional addresses needed: " + (devices - addresses));
    }