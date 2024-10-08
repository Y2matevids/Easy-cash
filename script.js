let balance = 0;
let videoWatched = false;
let currentVideoIndex = 0;
let videoTimer; // Timer for video watching

const videos = [
    "Rqs0UoeFrOU", // Video 1
    "YOJPDxq_Ac4", // Video 2 
    "Vx8A7XWuQl4"  // Video 3 
];

let hasShared = false; // Track if the user has shared the website

function loadVideo() {
    const videoId = videos[currentVideoIndex];
    document.getElementById('videoPlayer').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function watchVideo() {
    document.getElementById('watchButton').disabled = true;
    videoTimer = setTimeout(() => {
        alert("You have watched the video for 3 minutes! Now, please visit the channel to subscribe.");
        videoWatched = true;
        document.getElementById('visitChannelButton').disabled = false; // Enable visit channel button
    }, 180000); // 3 minutes in milliseconds

    alert("Start watching the video!");
}

function subscribe() {
    if (!videoWatched) {
        alert("You need to watch the video for 3 minutes before subscribing.");
        return;
    }
    alert("You have successfully subscribed to the channel and earned $0.50!");
    videoWatched = false; // Reset video watch status
    balance += 0.50; // Increase balance by $0.50 for subscribing
    document.getElementById('balance').innerText = balance.toFixed(2);
    checkWithdrawalEligibility();

    currentVideoIndex = (currentVideoIndex + 1) % videos.length; // Cycle through videos
    loadVideo(); // Load next video
}

function visitChannel() {
    if (!videoWatched) {
        alert("You need to watch the video for 3 minutes before visiting the channel.");
        return;
    }
    window.open("https://www.youtube.com/channel/UCDL6PBnnd8Rwumuzvlo2AVg", "_blank");
    alert("Thank you for visiting the channel!");
}

function shareWebsite() {
    const url = encodeURIComponent(window.location.href); // Current URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    
    window.open(facebookShareUrl, '_blank'); // Open Facebook share dialog

    hasShared = true; // Mark as shared
    alert("Thank you for sharing! You can now withdraw your funds.");
}

function showWithdrawalOptions() {
    if (!hasShared) {
        alert("Please share our website on Facebook before you can withdraw.");
        return; // Prevent withdrawal options from showing
    }
    
    document.getElementById('withdrawalOptions').classList.toggle('hidden');
}

function showWithdrawalMethod(method) {
    const forms = document.querySelectorAll('.withdrawal-method');
    forms.forEach(form => form.classList.add('hidden'));
    
    document.getElementById(`${method}Form`).classList.remove('hidden');
    document.getElementById('withdrawalForm').classList.remove('hidden');
}

function completeWithdrawal(method) {
    let message = '';
    
    if (method === 'paypal') {
        const email = document.getElementById('paypalEmail').value;
        message = `Withdraw request sent to PayPal email: ${email}`;
    } else if (method === 'phone') {
        const phone = document.getElementById('phoneNumber').value;
        message = `Withdraw request sent to phone number: ${phone}`;
    } else if (method === 'binance') {
        const address = document.getElementById('binanceAddress').value;
        message = `Withdraw request sent to Binance address: ${address}`;
    }
    
    alert(message);
    
    if (balance >= 10) {
        balance -= 10; // Deduct minimum withdrawal amount
        document.getElementById('balance').innerText = balance.toFixed(2);
    } else {
        alert("You need at least $10 to withdraw.");
    }
    
    document.getElementById('withdrawalOptions').classList.add('hidden');
    hasShared = false; // Reset share status after withdrawal
    alert("Your withdrawal request has been processed!");
}

function checkWithdrawalEligibility() {
    if (balance >= 10) {
        document.getElementById('withdrawMessage').classList.remove('hidden');
    } else {
        document.getElementById('withdrawMessage').classList.add('hidden');
    }
}

// Load the first video on page load
loadVideo();
