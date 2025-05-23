SELECT L.*
            
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