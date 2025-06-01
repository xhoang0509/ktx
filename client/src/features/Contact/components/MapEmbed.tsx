export default function MapEmbed() {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 p-6 pb-4">Vị trí của chúng tôi</h2>
            <div className="aspect-video w-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d72514.76942848907!2d106.05370501439482!3d20.925628808502115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a312037a588d%3A0xebc2495a61b8375f!2sMy%20Hao%20District%2C%20Hung%20Yen%2C%20Vietnam!5e1!3m2!1sen!2s!4v1748363960420!5m2!1sen!2s"
                    width="600"
                    height="450"
                ></iframe>
            </div>
        </div>
    );
}
