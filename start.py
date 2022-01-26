import sys
import keyboard
import os


class Start:
    selected = 1

    def __init__(self):
        self.show_menu()
        keyboard.add_hotkey("up", self.up)
        keyboard.add_hotkey("down", self.down)
        keyboard.add_hotkey("enter", self.enter)
        keyboard.wait()

    def show_menu(self):
        os.system("cls")
        print("Rodar em modo desenvolvimento ou produção?")
        for i, n in ((1, "Desenvolvimento"), (2, "Produção (WIP)")):
            print(
                "{0} {2} {1}".format(
                    ">" if self.selected == i else " ",
                    "<" if self.selected == i else " ",
                    n,
                )
            )

    def up(self):
        if self.selected == 1:
            return
        self.selected -= 1
        self.show_menu()

    def down(self):
        if self.selected == 2:
            return
        self.selected += 1
        self.show_menu()

    def enter(self):
        print(self.selected)
        os.system("cls")

        if self.selected == 1:
            self.run("dev")

        if self.selected == 2:
            self.run("prod")

    def run(self, stage: str):
        docker_cmd = f"docker-compose -f docker-compose.{stage}.yml up --build"

        os.system(f"{docker_cmd} -d {stage}-postgres")

        while True:
            log = os.popen(f"docker logs --until=2s {stage}-postgres").read()
            splitted = log.split()

            if splitted != []:
                if splitted[-1] == "initialization" or splitted[-1] == "up.":
                    break

        os.chdir("./app")

        os.system("yarn build") if stage == "prod" else None
        os.system("yarn typeorm migration:run")

        os.chdir("..")

        os.system(docker_cmd)

        sys.exit(0)


Start()
