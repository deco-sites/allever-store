export default function Flag({
  textColor = "#fff",
  Bgcolor = "#000",
  backgroundImage = "",
  label = "Promoção",
  type = ""
}) {
  if (type === "product-card") {
    return (
      <div
        class="text-xs font-semibold uppercase text-center px-2 py-1 rounded-full"
        style={{
          color: textColor,
          backgroundColor: Bgcolor,
          backgroundImage: `url(${backgroundImage ?? ""})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        dangerouslySetInnerHTML={{ __html: label }}
      />
    );
  }

  return (
    <div
      class="py-2 px-5 lg:px-10 text-xs text-semibold text-center rounded-[6px] h-8 flex items-center justify-center"
      style={{
        color: textColor,
        backgroundColor: Bgcolor,
        backgroundImage: `url(${backgroundImage ?? ""})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}
