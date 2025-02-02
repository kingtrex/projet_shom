from os import write

from fastapi import APIRouter, Depends, Request
from typing import Annotated
from psycopg2.extras import RealDictCursor
import xml.etree.ElementTree as ET
from xml.dom import minidom

from starlette.responses import FileResponse

from connexion.connexion import User, get_current_user
from databaseConnect import database_connect

router = APIRouter()

SML_FILE_NAME = "test.sml"
PATH_SML_FILE = "api/" + SML_FILE_NAME

class Identifier:
    def __init__(self, name, definition, value):
        self.name = name
        self.definition = definition
        self.value = value

def header_sml(member, id_maregraphe: int, maregraphe: str):
    tab_identifier = [
        Identifier("uniqueID", "urn:ogc:def:identifier:OGC:1.0:uniqueID", f"http://shom.fr/maregraphie/procedure/{id_maregraphe}"),
        Identifier("id_shom", "http://", str(id_maregraphe)),
        Identifier("longName", "urn:ogc:def:identifier:OGC:1.0:longName", maregraphe)
    ]

    system = ET.SubElement(member, "sml:System")
    identification = ET.SubElement(system, "sml:identification")
    identifier_list = ET.SubElement(identification, "sml:IdentifierList")
    for i in tab_identifier:
        identifier = ET.SubElement(identifier_list, "sml:Identifier")
        identifier.set("name", i.name)
        term = ET.SubElement(identifier, "sml:Term")
        term.set("definition", i.definition)
        value = ET.SubElement(term, "sml:value")
        value.text = i.value

    return system

def maregraphe_sml(capabilities, data):
    for d in data:
        field = ET.SubElement(capabilities, "swe:field")
        field.set("name", d["id_meta"])
        text = ET.SubElement(field, "swe:Text")
        text.set("definition", f"http://shom.fr/maregraphie/{d['id_meta']}")
        value = ET.SubElement(text, "swe:value")
        value.text = d["donnee"]

def legal_contraints(system):
    legal_constraint = ET.SubElement(system, "sml:legalConstraint")
    rights = ET.SubElement(legal_constraint, "sml:Rights")
    documentation = ET.SubElement(rights, "sml:documentation")
    document = ET.SubElement(documentation, "sml:Document")
    description = ET.SubElement(document, "sml:description")
    description.text = "Voir les conditions générales d'utilisation sur l'espace de diffusion."

def create_sml(data, maregraphe: str, id_maregraphe: int):

    root = ET.Element("SensorML", attrib={"xmlns": "http://www.opengis.net/sensorML/1.0.1"})

    member = ET.SubElement(root, "sml:member")

    system = header_sml(member, id_maregraphe, maregraphe)

    capabilities = ET.SubElement(system, "sml:capabilities")
    capabilities.set("name", "characterics")
    maregraphe_sml(capabilities, data)

    legal_contraints(system)

    return root

@router.get("/exportMeta/{id_maregraphe}&{nom_maregraphe}", response_class=FileResponse)
async def export_sml(id_maregraphe: int,
                     nom_maregraphe: str,
                     request: Request,
                     token: Annotated[User, Depends(get_current_user)]):
    db = database_connect()
    cur = db.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * from obsmar.maregraphe_meta\
                   WHERE id_maregraphe = %s;", (id_maregraphe,))

    meta = cur.fetchall()
    data = [dict(meta) for meta in meta]
    root = create_sml(data, nom_maregraphe, id_maregraphe)
    ET.indent(root, space="  ")
    tree = ET.ElementTree(root)
    tree.write(PATH_SML_FILE, xml_declaration=True, encoding="utf-8")
    return FileResponse(PATH_SML_FILE, media_type="text/xml", filename=SML_FILE_NAME)

if __name__ == "__main__": export_sml("test.sml")