﻿


            SELECT 
            TABELE,
            MAX(TABELE_VERS) TABELE_VERS
            
             FROM  CIS2.MD_TABLES
             
             WHERE 
             FORM = 48
             GROUP BY 
             TABELE