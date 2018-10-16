select * from cita as c inner join  estatus as s  on   c.id_cita=s.id_estatus
inner join doctor as d on c.id_doctor= d.id_doctor inner join factura as f where  f.id_estatus=2