const isOTPexpired = async(otpData) => {
    console.log(otpData);
    // Add 5 minutes to the createdAt time
    const twoMinutesLater = new Date(otpData.createdAt.getTime() + (5 * 60 * 1000));
    
    // Get the current time
    const currentTime = new Date();
    console.log(currentTime - twoMinutesLater);
    // Check if two minutes have passed
    if (currentTime.getTime() >= twoMinutesLater.getTime()) {
        console.log("OTP EXpired");
      return "OTP_EXPIRED";
    } else {
        console.log("OTP not EXpired");
      return "success";
      }
    }
    
    module.exports = isOTPexpired;