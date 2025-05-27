export default function MapEmbed() {
    // You can replace this with an actual Google Maps iframe if available
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 p-6 pb-4">Vị trí của chúng tôi</h2>
            <div className="aspect-video w-full">
                {/* Option 1: Google Maps iframe */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d72514.76942848907!2d106.05370501439482!3d20.925628808502115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a312037a588d%3A0xebc2495a61b8375f!2sMy%20Hao%20District%2C%20Hung%20Yen%2C%20Vietnam!5e1!3m2!1sen!2s!4v1748363960420!5m2!1sen!2s"
                    width="600"
                    height="450"
                ></iframe>
                {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580824273!2d106.6880841!3d10.7718442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xb94ea2a1a909d8f!2zxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1661437389945!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dormitory Location Map"
                    className="w-full h-full"
                ></iframe> */}

                {/* Option 2 (Alternative): Image placeholder */}
                {/* Uncomment this and comment the iframe above if you prefer using an image instead
        <img 
          src="https://source.unsplash.com/800x400/?university,building" 
          alt="University Dormitory Location"
          className="w-full h-full object-cover"
        />
        */}
            </div>
        </div>
    );
}
