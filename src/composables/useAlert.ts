import { alertController } from "@ionic/vue";

export function useAlert() {
  async function unavalaibleFunction() {
    const alert = await alertController.create({
      header: "Fonction indisponible",
      message:
        "La fonctionnalité n'est pas encore disponible, Nous faisons tout notre possible pour que vous puissiez l'utiliser dans une prochaine version",
      buttons: ["Fermer"],
    });

    await alert.present();
  }

  return {
    unavalaibleFunction,
  };
}
