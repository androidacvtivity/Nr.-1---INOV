--INSERT INTO CIS2.MD_TABLES 
--
--(
--ID_MDTABLE,
--TABELE,
--TABELE_VERS,
--FORM,
--FORM_VERS,
--DENUMIRE,
--DEN_SHORT,
--NIVELRAIONAL,
--ORDINE,
--DATA_REG,
--STATUT,
--HTML_HEADER,
--SQL_TEXT,
--SQL_TEXT1,
--LANDSCAPE,
--COL_NUM,
--FOOTNOTE,
--UM,
--CREATING
--
--)

--------------------------------------

SELECT 
L.ID_MDTABLE,
L.TABELE,
2013  TABELE_VERS,
L.FORM,
L.FORM_VERS,
L.DENUMIRE,
L.DEN_SHORT,
L.NIVELRAIONAL,
L.ORDINE,
L.DATA_REG,
L.STATUT,
L.HTML_HEADER,
L.SQL_TEXT,
L.SQL_TEXT1,
L.LANDSCAPE,
L.COL_NUM,
L.FOOTNOTE,
L.UM,
L.CREATING

            
                FROM CIS2.MD_TABLES L INNER JOIN (
                
                 SELECT 
            TABELE,
            MAX(TABELE_VERS) TABELE_VERS
            
             FROM  CIS2.MD_TABLES
             
             WHERE 
             FORM = 48
             GROUP BY 
             TABELE
                )  R ON R.TABELE = L.TABELE AND R.TABELE_VERS = L.TABELE_VERS  
                
                
                WHERE 
                L.STATUT = '1'
                AND L.FORM = 48
                
                ORDER BY
                L.ORDINE