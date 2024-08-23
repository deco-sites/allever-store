import { useState } from 'preact/hooks';

const Form = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        cpfCnpj: '',
        phone: '',
        orderNumber: '',
        contactReason: '',
        subject: '',
        description: ''
    });

    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({
        message: '',
        type: null
    });

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const formatCpfCnpj = (value: string) => {
        value = value.replace(/\D/g, '');
        if (value.length <= 11) {
            return value.replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            return value.replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        }
    };

    const formatPhone = (value: string) => {
        value = value.replace(/\D/g, '');
        if (value.length > 10) {
            return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
    };

    const handleChange = (e: Event) => {
        let { name, value } = e.target as HTMLInputElement;

        if (name === 'cpfCnpj') {
            value = formatCpfCnpj(value);
        } else if (name === 'phone') {
            value = formatPhone(value);
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleFocus = (e: Event) => {
        const { id } = e.target as HTMLInputElement;
        setFocusedField(id);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        // Validate email
        if (!validateEmail(formData.email)) {
            showToast("E-mail inválido.", 'error');
            return;
        }

        // Simulate form submission
        const isSubmissionSuccessful = Math.random() > 0.5; // Simulate success or failure

        if (isSubmissionSuccessful) {
            showToast("Formulário enviado com sucesso!", 'success');
        } else {
            showToast("Erro ao enviar o formulário. Tente novamente.", 'error');
        }

        // Reset form fields after submission
        setFormData({
            email: '',
            fullName: '',
            cpfCnpj: '',
            phone: '',
            orderNumber: '',
            contactReason: '',
            subject: '',
            description: ''
        });
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });

        setTimeout(() => {
            setToast({ message: '', type: null });
        }, 3000); // Toast disappears after 3 seconds
    };

    return (
        <div>
            {toast.type && (
                <div
                    class={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                >
                    {toast.message}
                </div>
            )}

            <form
                class="container px-5 py-4 w-full mx-auto my-[30px] bg-white rounded-[10px]"
                onSubmit={handleSubmit}
            >
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'email' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="email"
                    >
                        E-mail*
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Digite aqui"
                        value={formData.email}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'fullName' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="fullName"
                    >
                        Nome completo*
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullName"
                        type="text"
                        name="fullName"
                        placeholder="Digite aqui"
                        value={formData.fullName}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'cpfCnpj' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="cpfCnpj"
                    >
                        CPF/CNPJ*
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cpfCnpj"
                        type="text"
                        name="cpfCnpj"
                        placeholder="Digite aqui"
                        value={formData.cpfCnpj}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'phone' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="phone"
                    >
                        Telefone*
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Digite aqui"
                        value={formData.phone}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'orderNumber' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="orderNumber"
                    >
                        Número do pedido (opcional)
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="orderNumber"
                        type="text"
                        name="orderNumber"
                        placeholder="Digite aqui"
                        value={formData.orderNumber}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'contactReason' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="contactReason"
                    >
                        Motivo do seu contato*
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="contactReason"
                        type="text"
                        name="contactReason"
                        placeholder="Digite aqui"
                        value={formData.contactReason}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'subject' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="subject"
                    >
                        Assunto*
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="Digite aqui"
                        value={formData.subject}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div class="mb-4">
                    <label
                        class={`block text-xs font-bold mb-2 ${focusedField === 'description' ? 'text-[#123ADD]' : 'text-gray-700'
                            }`}
                        htmlFor="description"
                    >
                        Descrição*
                    </label>
                    <textarea
                        class="shadow appearance-none border rounded min-h-[300px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        placeholder="Digite aqui"
                        value={formData.description}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    ></textarea>
                </div>
                <div class="flex items-center justify-center lg:justify-start">
                    <button
                        class="bg-black text-white font-bold py-3 px-4 rounded rounded-[30px] w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        ENVIAR
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
