export const requiredRule = () => {
	return (v: string) => v !== "" && !/^[\s]+$/.test(v) && !!v || "Поле обязательное для заполнения";
};

export const validateEmailRule = () => {
	return (v: string) => !v || /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || "Введите валидный email";
};
