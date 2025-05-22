import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import MapEmbed from '../components/MapEmbed';

export default function Contact() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Liên hệ ký túc xá</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ hoặc muốn biết thêm thông tin.
                </p>
            </div>
            
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column: Contact info and form */}
                <div className="space-y-8">
                    <ContactInfo />
                    <ContactForm />
                </div>
                
                {/* Right column: Map */}
                <div className="lg:sticky lg:top-6">
                    <MapEmbed />
                </div>
            </div>
        </div>
    );  
}
