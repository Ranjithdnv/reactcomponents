export default function calculate(type, value) {
  const today = new Date();

  // Function 1: birthAndAge
  function birthAndAge(type, value) {
    if (type === "dobToAge") {
      // Calculate age from date of birth
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();

      // If the birthday hasn't occurred yet this year, subtract 1 from the age
      if (
        today <
        new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
      ) {
        age--;
      }

      return age;
    }

    if (type === "ageToDob") {
      // Calculate date of birth given age (only return yyyy-00-00 format)
      const dobYear = today.getFullYear() - Number(value);
      return ` ${dobYear}`;
    }

    if (type === "age") {
      // Convert date of birth to numerical age
      const birthDate = new Date(value);
      const age =
        today.getFullYear() -
        birthDate.getFullYear() -
        (today <
        new Date(
          `${today.getFullYear()}-${
            birthDate.getMonth() + 1
          }-${birthDate.getDate()}`
        )
          ? 1
          : 0);
      return `${age}`;
    }

    if (type === "date") {
      // Calculate date 'value' years ago (only return yyyy-00-00 format)
      const yearsBack = Number(value);
      const birthDate = new Date(
        today.setFullYear(today.getFullYear() - yearsBack)
      ).getFullYear();
      return `Birth date ${yearsBack} years ago: ${birthDate}-00-00`;
    }

    return "Invalid type or input!";
  }

  // Function 2: dateToDaysMonthsYears
  function dateToDaysMonthsYears(inputDate) {
    const givenDate = new Date(inputDate);
    const timeDifference = today - givenDate;

    // Calculate total days
    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate years, months, and days
    const years = Math.floor(totalDays / 365.25); // considering leap years
    const months = Math.floor((totalDays % 365.25) / 30); // Approximate months
    const days = totalDays % 30; // Remaining days

    return { years, months, days };
  }

  // Function 3: Format date as DD-MM-YYYY
  function formatDate(inputDate) {
    const [day, month, year] = inputDate.split(",");
    return `${day}-${month}-${year}`;
  }
  function DaysMonthsYearsToDate(year, month, day) {
    const today = new Date(); // Get the current date
    const inputDate = new Date(year, month - 1, day); // Create a date from the input (adjust for 0-indexed months)

    // Calculate the difference between the current date and the input date
    let yearsDifference = today.getFullYear() - year;
    let monthsDifference = today.getMonth() - month - 1;
    let daysDifference = today.getDate() - day;

    // Adjust if month or day is negative
    if (monthsDifference < 0) {
      monthsDifference += 12;
    }
    if (daysDifference < 0) {
      daysDifference += new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate(); // Get the last day of the current month
      monthsDifference--;
    }

    // Subtract the years, months, and days from today to calculate the target date
    today.setFullYear(yearsDifference);
    today.setMonth(monthsDifference);
    today.setDate(daysDifference);

    // Return the new date in yyyy-mm-dd format
    return today.toISOString().slice(0, 10); // Extracting 'yyyy-mm-dd' format
  }

  // Example usage:

  // Check the type to decide which function to call
  if (
    type === "dobToAge" ||
    type === "ageToDob" ||
    type === "age" ||
    type === "date"
  ) {
    return birthAndAge(type, value); // Call birthAndAge function
  } else if (type === "dateToDaysMonthsYears") {
    return dateToDaysMonthsYears(value); // Call dateToDaysMonthsYears function
  } else if (type === "formatDate") {
    return formatDate(value); // Call formatDate function
  } else if (type === "DaysMonthsYearsToDate") {
    const [year, month, day] = value.split(",").map(Number); // Split the input string and convert to numbers
    return DaysMonthsYearsToDate(year, month, day);
  }

  return "Invalid type or input!";
}

// Example usage:
console.log(calculate("dobToAge", "1992-12-33")); // age = current year - 1992
console.log(calculate("ageToDob", "28")); // dob = current year - 28
console.log(calculate("age", "1992-2-19")); // Age in number format
console.log(calculate("date", "37")); // Birth date 37 years ago
console.log(calculate("dateToDaysMonthsYears", "1992-12-30")); // { years: 32, months: 1, days: 19 }
console.log(calculate("formatDate", "01,04,1992")); // "01-04-1992"
console.log(calculate("DaysMonthsYearsToDate", "11,11,17")); // "01-04-1992"
