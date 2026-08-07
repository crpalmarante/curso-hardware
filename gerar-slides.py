#!/usr/bin/env python3
# ============================================================
#  Gerador de Apresentação (PDF) do Curso de Montagem e
#  Manutenção de Computadores — para diretores e instrutores.
#
#  Requisitos: reportlab  (instale com:  pip install reportlab)
#  Uso:        python3 gerar-slides.py
#  Saída:      APRESENTACAO-CURSO.pdf
# ============================================================
import json
import os
import re

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak, SimpleDocTemplate
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARQ_SAIDA = os.path.join(BASE_DIR, "APRESENTACAO-CURSO.pdf")

# ------------------------------------------------------------
#  Cores do tema (igual ao site)
# ------------------------------------------------------------
AZUL = colors.HexColor("#06101f")
AZUL2 = colors.HexColor("#101b35")
AZUL3 = colors.HexColor("#151044")
TEAL = colors.HexColor("#14b8a6")
TEAL_ESCURO = colors.HexColor("#0f766e")
AZUL_BOT = colors.HexColor("#3B82F6")
DOURADO = colors.HexColor("#c9a227")
BRANCO = colors.white
CINZA = colors.HexColor("#cbd5e1")
CINZA_ESCURO = colors.HexColor("#94a3b8")

# ------------------------------------------------------------
#  Carrega os módulos reais do curso.js
# ------------------------------------------------------------
def carregar_modulos():
    texto = open(os.path.join(BASE_DIR, "curso.js"), encoding="utf-8").read()
    mods = []
    # cada módulo: num, titulo, objetivo + bloco de aulas
    for bloco in re.finditer(r'\{\s*num:"(\d+)",\s*titulo:"([^"]+)",\s*objetivo:"([^"]*)",\s*aulas:\[(.*?)\]\s*\}', texto, re.S):
        num, titulo, objetivo, aulas_txt = bloco.groups()
        aulas = re.findall(r'\bt:"([^"]+)"', aulas_txt)
        mods.append({"num": num, "titulo": titulo, "objetivo": objetivo, "aulas": aulas})
    return mods

MODULOS = carregar_modulos()
TOTAL_AULAS = sum(len(m["aulas"]) for m in MODULOS)

# ------------------------------------------------------------
#  Estilos
# ------------------------------------------------------------
PAGINA_W, PAGINA_H = landscape(A4)
MARGEM = 16 * mm

st_titulo = ParagraphStyle("titulo", fontName="Helvetica-Bold", fontSize=26,
                           textColor=BRANCO, leading=32, spaceAfter=2*mm)
st_sub = ParagraphStyle("sub", fontName="Helvetica", fontSize=13,
                        textColor=CINZA, leading=18)
st_chip = ParagraphStyle("chip", fontName="Helvetica-Bold", fontSize=10,
                         textColor=TEAL, leading=14)
st_h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=22,
                       textColor=BRANCO, leading=27)
st_h3 = ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=14,
                       textColor=BRANCO, leading=19)
st_p = ParagraphStyle("p", fontName="Helvetica", fontSize=11.5,
                      textColor=CINZA, leading=16)
st_p_branco = ParagraphStyle("pb", fontName="Helvetica", fontSize=11.5,
                             textColor=BRANCO, leading=16)
st_num = ParagraphStyle("num", fontName="Helvetica-Bold", fontSize=17,
                        textColor=TEAL, leading=20)
st_rodape = ParagraphStyle("rodape", fontName="Helvetica", fontSize=8,
                           textColor=CINZA_ESCURO, leading=10)

# ------------------------------------------------------------
#  Decoradores de página (fundo e rodapé)
# ------------------------------------------------------------
def fundo_pagina(canvas, doc):
    canvas.saveState()
    # fundo gradiente aproximado (três faixas)
    canvas.setFillColor(AZUL); canvas.rect(0, 0, PAGINA_W, PAGINA_H, stroke=0, fill=1)
    canvas.setFillColor(AZUL2); canvas.rect(0, 0, PAGINA_W, PAGINA_H*0.45, stroke=0, fill=1)
    canvas.setFillColor(AZUL3); canvas.rect(0, 0, PAGINA_W, PAGINA_H*0.18, stroke=0, fill=1)
    # faixa teal no topo
    canvas.setFillColor(TEAL); canvas.rect(0, PAGINA_H-6*mm, PAGINA_W, 6*mm, stroke=0, fill=1)
    # rodapé
    canvas.setFillColor(CINZA_ESCURO)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGEM, 8*mm, "Apresentação do Curso · Curso de Montagem e Manutenção de Computadores")
    canvas.drawRightString(PAGINA_W-MARGEM, 8*mm, "Página %d" % doc.page)
    canvas.restoreState()

# ------------------------------------------------------------
#  Slide de capa
# ------------------------------------------------------------
def slide_capa():
    return [
        Spacer(1, 42*mm),
        Paragraph("MONTAGEM E MANUTENÇÃO DE COMPUTADORES", st_titulo),
        Spacer(1, 3*mm),
        Paragraph("Curso completo do zero ao profissional — fundamentos, montagem, instalação, manutenção, redes e atendimento ao cliente.", st_sub),
        Spacer(1, 12*mm),
        Paragraph("APRESENTAÇÃO DO CURSO", st_chip),
        Spacer(1, 26*mm),
        Paragraph("• Estrutura do curso  &nbsp;&nbsp;•&nbsp; Metodologia de aula  &nbsp;&nbsp;•&nbsp; Avaliação  &nbsp;&nbsp;•&nbsp; Certificação", st_p_branco),
    ]

# ------------------------------------------------------------
#  Slide de visão geral
# ------------------------------------------------------------
def slide_visao():
    celulas = [
        ["8", "43", "86", "2"],
        ["Módulos", "Aulas", "Horas", "h/semana"],
    ]
    t = Table(celulas, colWidths=[35*mm]*4, rowHeights=[18*mm, 10*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), TEAL_ESCURO),
        ("TEXTCOLOR", (0,0), (-1,0), BRANCO),
        ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,0), 18),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TEXTCOLOR", (0,1), (-1,1), CINZA),
        ("FONTNAME", (0,1), (-1,1), "Helvetica-Bold"),
        ("FONTSIZE", (0,1), (-1,1), 10),
        ("BACKGROUND", (0,1), (-1,1), colors.HexColor("#0b1a33")),
        ("GRID", (0,0), (-1,-1), 0.6, colors.HexColor("#1e3a5f")),
        ("BOX", (0,0), (-1,-1), 1.2, TEAL),
    ]))
    return [
        Paragraph("VISÃO GERAL", st_chip),
        Spacer(1, 4*mm),
        Paragraph("Um curso prático, com uma aula por semana", st_h2),
        Spacer(1, 6*mm),
        t,
        Spacer(1, 8*mm),
        Paragraph("• <b>43 semanas</b> de formação contínua (um ano letivo completo)<br/>"
                  "• Curso <b>100% prático</b>, com laboratório em cada aula<br/>"
                  "• Materiais: livro em 8 volumes + 2 apêndices, caderno de exercícios e roteiros de bancada", st_p),
    ]

# ------------------------------------------------------------
#  Slides por módulo
# ------------------------------------------------------------
def slide_modulo(m):
    nome_aulas = m["aulas"]
    linhas = [[Paragraph("<b>%s</b>" % (i+1), st_num),
               Paragraph(nome_aulas[i], st_p_branco)] for i in range(len(nome_aulas))]
    t = Table(linhas, colWidths=[10*mm, 205*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#0d1f3d")),
        ("TEXTCOLOR", (0,0), (-1,-1), BRANCO),
        ("FONTNAME", (0,0), (-1,-1), "Helvetica"),
        ("FONTSIZE", (0,0), (-1,-1), 11),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LINEBELOW", (0,0), (-1,-2), 0.4, colors.HexColor("#1e3a5f")),
        ("TOPPADDING", (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ("BOX", (0,0), (-1,-1), 0.6, colors.HexColor("#1e3a5f")),
    ]))
    return [
        Paragraph("MÓDULO %s DE %d" % (m["num"], len(MODULOS)), st_chip),
        Spacer(1, 3*mm),
        Paragraph(m["titulo"], st_h2),
        Spacer(1, 3*mm),
        Paragraph(m["objetivo"], st_p),
        Spacer(1, 6*mm),
        t,
    ]

# ------------------------------------------------------------
#  Metodologia
# ------------------------------------------------------------
def slide_metodologia():
    etapas = [
        ("1", "Revisão", "Retomada da aula anterior"),
        ("2", "Teoria", "Exposição dialogada"),
        ("3", "Demonstração", "Prática guiada pelo instrutor"),
        ("4", "Prática", "O aluno faz e registra o checkout"),
        ("5", "Fechamento", "Correção e próximos passos"),
    ]
    linhas = [[Paragraph("<b>%s</b>" % e[0], st_num), Paragraph("<b>%s</b>" % e[1], st_p_branco),
               Paragraph(e[2], st_p)] for e in etapas]
    t = Table(linhas, colWidths=[12*mm, 42*mm, 160*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#0d1f3d")),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LINEBELOW", (0,0), (-1,-2), 0.4, colors.HexColor("#1e3a5f")),
        ("BOX", (0,0), (-1,-1), 0.6, colors.HexColor("#1e3a5f")),
    ]))
    return [
        Paragraph("METODOLOGIA", st_chip),
        Spacer(1, 4*mm),
        Paragraph("Cada aula de 2 horas segue um roteiro fixo", st_h2),
        Spacer(1, 6*mm),
        t,
        Spacer(1, 8*mm),
        Paragraph("Resultado: o aluno <b>aprende fazendo</b>, registrando cada serviço como numa oficina real.", st_p),
    ]

# ------------------------------------------------------------
#  Avaliação
# ------------------------------------------------------------
def slide_avaliacao():
    linhas = [
        ["Participação e presença", "20%"],
        ["Exercícios (caderno, dissertativas, checkouts e provas)", "20%"],
        ["Montagem completa", "30%"],
        ["Diagnóstico e solução", "30%"],
    ]
    t = Table(linhas, colWidths=[175*mm, 40*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#0d1f3d")),
        ("TEXTCOLOR", (0,0), (-1,-1), BRANCO),
        ("FONTNAME", (0,0), (-1,-1), "Helvetica"),
        ("FONTSIZE", (0,0), (-1,-1), 12),
        ("ALIGN", (1,0), (1,-1), "CENTER"),
        ("FONTNAME", (1,0), (1,-1), "Helvetica-Bold"),
        ("TEXTCOLOR", (1,0), (1,-1), TEAL),
        ("TOPPADDING", (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ("LINEBELOW", (0,0), (-1,-2), 0.4, colors.HexColor("#1e3a5f")),
        ("BOX", (0,0), (-1,-1), 0.6, colors.HexColor("#1e3a5f")),
    ]))
    return [
        Paragraph("AVALIAÇÃO", st_chip),
        Spacer(1, 4*mm),
        Paragraph("Nota final com critérios claros", st_h2),
        Spacer(1, 6*mm),
        t,
        Spacer(1, 8*mm),
        Paragraph("Aprovação: <b>nota final ≥ 6</b> e <b>frequência ≥ 75%</b>. Cada aula tem exercícios de fixação e avaliação por módulo.", st_p),
    ]

# ------------------------------------------------------------
#  Certificação
# ------------------------------------------------------------
def slide_certificado():
    return [
        Paragraph("CERTIFICAÇÃO", st_chip),
        Spacer(1, 4*mm),
        Paragraph("Certificado com QR Code de verificação", st_h2),
        Spacer(1, 6*mm),
        Paragraph("• <b>Certificado de conclusão</b> para o aluno aprovado<br/>"
                  "• <b>QR Code único</b> com código de verificação<br/>"
                  "• Confere a autenticidade em qualquer lugar pela internet<br/>"
                  "• Registro completo: notas, frequência e histórico do aluno", st_p),
        Spacer(1, 8*mm),
        Paragraph("O certificado pode ser verificado a qualquer momento pela página pública do curso — valoriza o documento e protege contra falsificações.", st_p),
    ]

# ------------------------------------------------------------
#  Encerramento
# ------------------------------------------------------------
def slide_final():
    return [
        Spacer(1, 40*mm),
        Paragraph("Pronto para transformar o laboratório em formação de profissionais?", st_h2),
        Spacer(1, 8*mm),
        Paragraph("Curso de Montagem e Manutenção de Computadores<br/>"
                  "8 módulos · 43 aulas · 86 horas · Certificado verificado por QR Code", st_p),
        Spacer(1, 20*mm),
        Paragraph("OBRIGADO!", st_chip),
    ]

# ------------------------------------------------------------
#  Monta o documento
# ------------------------------------------------------------
def construir():
    doc = SimpleDocTemplate(ARQ_SAIDA, pagesize=landscape(A4),
                            leftMargin=MARGEM, rightMargin=MARGEM,
                            topMargin=MARGEM, bottomMargin=16*mm,
                            title="Apresentação — Curso de Montagem e Manutenção de Computadores",
                            author="Curso de Montagem e Manutenção de Computadores")
    elementos = []

    # capa
    elementos += slide_capa()
    elementos.append(PageBreak())

    # visão geral
    elementos += slide_visao()
    elementos.append(PageBreak())

    # metodologia
    elementos += slide_metodologia()
    elementos.append(PageBreak())

    # módulos (um por página)
    for m in MODULOS:
        elementos += slide_modulo(m)
        elementos.append(PageBreak())

    # avaliação
    elementos += slide_avaliacao()
    elementos.append(PageBreak())

    # certificação
    elementos += slide_certificado()
    elementos.append(PageBreak())

    # encerramento
    elementos += slide_final()

    doc.build(elementos, onFirstPage=fundo_pagina, onLaterPages=fundo_pagina)
    print("PDF gerado:", ARQ_SAIDA)

if __name__ == "__main__":
    construir()
