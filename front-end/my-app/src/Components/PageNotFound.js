import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <>
  <section className="bg-light">
	<div className="container-fluid">
		<div className="row row-cols-1 justify-content-center py-5">
			<div className="col-xxl-7 mb-4">
				<div className="lc-block text-center">
					<img src="https://th.bing.com/th/id/OIP.F_NmOAkqHa5JrlkSrITeogHaEP?w=286&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt='error404' className="mx-auto" background="transparent"></img>
				</div>
			</div>
			<div className="col text-center">
				<div className="lc-block">
					<div className="lc-block mb-4">
						<div editable="rich">
							<p className="rfs-11 fw-light"> The page you are looking for was moved, removed or might never existed.</p>
						</div>
					</div>
					<div className="lc-block">
						<Link className="btn btn-primary" to="/" role="button">Back to homepage</Link>
					</div>
				</div>
			</div>
		</div>

	</div>
</section>  
    </>
  )
}
