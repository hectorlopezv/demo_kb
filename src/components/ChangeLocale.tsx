import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
const ChangeLocale = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const changeTo = router.locale === "en" ? "es" : "en";
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <div className="pl-2 pt-6">
        <Link
          href="/"
          locale={changeTo}
          className="border px-1 py-2 rounded border-black"
        >
          <button>{t("change_locale")}</button>
        </Link>
      </div>
    </>
  );
};
export default ChangeLocale;
