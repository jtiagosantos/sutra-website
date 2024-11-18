import { updateUserPreferencesAction } from "@/actions/update-user-preferences-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/use-user";
import { Bell, BellOff } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { FC, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export const ToggleDailyReminder = () => {
  const { user } = useUser();
  const { isExecuting, executeAsync } = useAction(updateUserPreferencesAction);
  const [open, setOpen] = useState(false);

  const handleConfirmAction = async () => {
    await executeAsync({
      id: user!.id,
      preferences: {
        active_daily_reminder: !user!.activeDailyRemainder,
      },
    });

    setOpen(false);

    window.location.reload();
  }

  return (
    <Dialog defaultOpen={open} open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 focus:bg-tropicalIndigo hover:bg-tropicalIndigo focus:text-white hover:text-white transition-all duration-300 font-body text-gray-600 font-medium relative cursor-default select-none rounded-md px-2 py-2 hover:cursor-pointer text-sm outline-none focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {user!.activeDailyRemainder ? <BellOff size={18} /> : <Bell size={18} />}
        {user!.activeDailyRemainder ? 'Desativar lembrete diário' : 'Ativar lembrete diário'}
      </DialogTrigger>
      <DialogContent className="bg-white py-8">
        <DialogHeader>
          <DialogTitle className="mb-4">{user!.activeDailyRemainder ? 'Desativar lembrete diário?' : 'Ativar lembrete diário?'}</DialogTitle>
          <DialogDescription>
            {user!.activeDailyRemainder ? `
              Você está prestes a desativar o lembrete diário por e-mail. 
              Não receberá mais notificações para participar dos quizzes.
            ` : `
              Você está prestes a ativar o lembrete diário por e-mail.
              Receberá uma notificação diariamente para participar dos quizzes.
            `}
            <br />
            Deseja confirmar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex items-center justify-end">
          <Button
            disabled={isExecuting}
            onClick={handleConfirmAction}
            className="w-[100px] text-white p-3 py-2 rounded-xl flex items-center justify-center gap-2 font-body text-base bg-tropicalIndigo font-normal">
            {isExecuting ? (
              <ThreeDots
                height="24"
                width="40"
                radius="9"
                color="#fff"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            ) : (
              'Confirmar'
            )}
          </Button>
          <Button
            disabled={isExecuting}
            onClick={() => setOpen(false)}
            className="p-3 py-2 rounded-xl flex items-center justify-center gap-2 font-body text-base border border-tropicalIndigo font-normal bg-transparent text-tropicalIndigo">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}