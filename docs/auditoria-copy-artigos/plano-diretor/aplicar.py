"""Aplica um lote do plano diretor nos JSONs de content/reviews.

Uso, na raiz do repositório:
    python -I docs/auditoria-copy-artigos/plano-diretor/aplicar.py L07 --check   # só confere
    python -I docs/auditoria-copy-artigos/plano-diretor/aplicar.py L07           # aplica

Em cada artigo a ordem é: replace; depois add e remove, do índice maior para o menor;
move-sections por último. Todo "antes" precisa conferir com o arquivo. Se algum não
conferir, o artigo fica intacto e o erro aparece na saída.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


def walk(doc, ptr):
    parts = [t.replace("~1", "/").replace("~0", "~") for t in ptr.lstrip("/").split("/")]
    cur = doc
    for t in parts[:-1]:
        cur = cur[int(t)] if isinstance(cur, list) else cur[t]
    return cur, parts[-1]


def get(doc, ptr):
    parent, key = walk(doc, ptr)
    return parent[int(key)] if isinstance(parent, list) else parent[key]


def same(a, b):
    return json.dumps(a, ensure_ascii=False, sort_keys=True) == json.dumps(b, ensure_ascii=False, sort_keys=True)


def apply_article(doc, props):
    units = [(p["id"], u) for p in props for u in p["unidades"]]
    errs = []
    reps = [x for x in units if x[1].get("op", "replace") == "replace"]
    struct = [x for x in units if x[1].get("op") in ("add", "remove")]
    moves = [x for x in units if x[1].get("op") == "move-sections"]

    for pid, u in reps:
        try:
            cur = get(doc, u["ponteiro"])
        except (KeyError, IndexError, ValueError, TypeError):
            errs.append(f"{pid}: ponteiro inexistente {u['ponteiro']}")
            continue
        if not same(cur, u["antes"]):
            errs.append(f"{pid}: antes não confere em {u['ponteiro']}")
            continue
        parent, key = walk(doc, u["ponteiro"])
        parent[int(key) if isinstance(parent, list) else key] = u["depois"]

    def position(x):
        parent, key = x[1]["ponteiro"].rsplit("/", 1)
        return (parent, int(key) if key.isdigit() else 10**9)

    for pid, u in sorted(struct, key=position, reverse=True):
        try:
            parent, key = walk(doc, u["ponteiro"])
        except (KeyError, IndexError, ValueError, TypeError):
            errs.append(f"{pid}: pai inexistente {u['ponteiro']}")
            continue
        if u["op"] == "remove":
            cur = parent[int(key)] if isinstance(parent, list) else parent.get(key)
            if u.get("antes") is not None and not same(cur, u["antes"]):
                errs.append(f"{pid}: antes não confere em {u['ponteiro']}")
                continue
            if isinstance(parent, list):
                del parent[int(key)]
            else:
                del parent[key]
        elif isinstance(parent, list):
            parent.insert(len(parent) if key == "-" else int(key), u.get("depois"))
        else:
            parent[key] = u.get("depois")

    for pid, u in moves:
        heads = [s.get("heading") for s in doc["contentSections"]]
        if not same(heads, u["antes"]):
            errs.append(f"{pid}: os títulos das seções não conferem com o move-sections")
            continue
        if sorted(u["depois"]) != sorted(heads):
            errs.append(f"{pid}: o move-sections faz mais que reordenar")
            continue
        by_heading = {s.get("heading"): s for s in doc["contentSections"]}
        doc["contentSections"] = [by_heading[h] for h in u["depois"]]
    return errs


def main():
    lote = sys.argv[1]
    check = "--check" in sys.argv
    root = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--root=")), os.getcwd())
    plan = json.load(open(os.path.join(HERE, "lotes", lote + ".json"), encoding="utf-8"))
    total = 0
    for art in plan["artigos"]:
        path = os.path.join(root, art["arquivo"])
        raw = open(path, encoding="utf-8", newline="").read()
        nl = "\r\n" if "\r\n" in raw else "\n"
        doc = json.loads(raw)
        errs = apply_article(doc, art["propostas"])
        if errs:
            total += len(errs)
            print(f"ERRO {art['slug']}:")
            for e in errs:
                print("   ", e)
            continue
        if not check:
            out = json.dumps(doc, ensure_ascii=False, indent=2).replace("\n", nl) + nl
            open(path, "w", encoding="utf-8", newline="").write(out)
        print(("conferido " if check else "aplicado ") + art["slug"])
    print(f"{lote}: {len(plan['artigos'])} artigos, {total} erros")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
